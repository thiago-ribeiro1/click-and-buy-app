const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const Order = require("./../public/src/models/Order");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const aiService = {
  // função principal exposta
  processUserQuestion: async (userId, pergunta) => {
    // buscar pedidos do usuário no banco pelo id
    const orders = await Order.find({ user: userId });

    // montar contexto com os pedidos
    const context = orders
      .map((p) => {
        const user = p.user?.username ?? "user name not found";
        const data = p.orderDate
          ? new Date(p.orderDate).toLocaleDateString()
          : "date unknown";
        const total = p.total?.toFixed(2) ?? "0.00";
        const itens = p.products?.length ?? 0;
        return `Em ${data}, ${user} comprou ${itens} item(s), total R$${total}`;
      })
      .join("\\n");

    // montar prompt final
    const prompt = `
      Você é um assistente que responde diretamente com base no histórico de pedidos fornecido abaixo.
      Não use frases como "baseado no contexto" ou "pode haver mais".
      Responda com confiança, de forma objetiva e clara.

      Histórico:
      ${context}

      Pergunta: ${pergunta}
      `;

    // gerar resposta da IA
    const p = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    const result = await model.generateContent(p, { timeout: 60000 });
    return result.response;
  },
};

module.exports = aiService;
