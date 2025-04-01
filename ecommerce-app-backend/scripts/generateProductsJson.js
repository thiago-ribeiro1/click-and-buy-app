const fs = require("fs");
const path = require("path");

// Lista dos produtos com nome e arquivo da imagem correspondente
const rawProducts = [
  {
    productCode: "P001",
    name: "Tênis Lacoste",
    price: 269.99,
    imageFile: "tenis-lacoste.png",
    category: "Calçados",
    description: "Tênis Lacoste",
    quantity: 100,
  },
  {
    productCode: "P002",
    name: "Mouse Redragon",
    price: 135.0,
    imageFile: "mouse-redragon.png",
    category: "Periféricos",
    description: "Mouse gamer RGB",
    quantity: 100,
  },
  {
    productCode: "P003",
    name: "PlayStation 5 Slim",
    price: 3150.0,
    imageFile: "ps5-slim.png",
    category: "Consoles",
    description: "Console Sony PS5 Slim",
    quantity: 50,
  },
  {
    productCode: "P004",
    name: "iPhone 15 Pro Max",
    price: 4094.0,
    imageFile: "iphone-15-pro-max.png",
    category: "Smartphones",
    description: "Apple iPhone 15 Pro Max",
    quantity: 80,
  },
  {
    productCode: "P005",
    name: "Apple Watch Series 10",
    price: 4589.0,
    imageFile: "apple-watch.png",
    category: "Acessórios",
    description: "Apple Watch última geração",
    quantity: 70,
  },
  {
    productCode: "P006",
    name: "Dragon Ball: Sparking! Zero",
    price: 323.91,
    imageFile: "dragon-ball-sparking.png",
    category: "Jogos",
    description: "Dragon Ball: Sparking! Zero",
    quantity: 60,
  },
  {
    productCode: "P007",
    name: "Fone de Ouvido Gamer Havit",
    price: 162.0,
    imageFile: "fone-havit.png",
    category: "Áudio",
    description: "Fone gamer com microfone",
    quantity: 90,
  },
  {
    productCode: "P008",
    name: "MousePad Gamer",
    price: 45.0,
    imageFile: "mousepad.png",
    category: "Periféricos",
    description: "MousePad grande com LED",
    quantity: 100,
  },
  {
    productCode: "P009",
    name: "Controle Dual Shock PS5",
    price: 351.0,
    imageFile: "controle-ps5.png",
    category: "Consoles",
    description: "Controle PS5",
    quantity: 50,
  },
  {
    productCode: "P010",
    name: "Monitor Gamer Odyssey Curvo",
    price: 2546.0,
    imageFile: "monitor-gamer.png",
    category: "Monitores",
    description: "Monitor curvo Samsung Odyssey",
    quantity: 40,
  },
  {
    productCode: "P011",
    name: "Alexa",
    price: 360.0,
    imageFile: "alexa.png",
    category: "Assistentes",
    description: "Assistente de voz da Amazon",
    quantity: 75,
  },
  {
    productCode: "P012",
    name: "Teclado Gamer",
    price: 89.0,
    imageFile: "teclado-gamer.png",
    category: "Periféricos",
    description: "Teclado mecânico gamer",
    quantity: 110,
  },
];

const baseImagePath = path.join(__dirname, "../assets/img");

const products = rawProducts.map((prod) => {
  const imagePath = path.join(baseImagePath, prod.imageFile);
  const imageData = fs.readFileSync(imagePath);
  const base64Image = `data:image/png;base64,${imageData.toString("base64")}`;

  return {
    productCode: prod.productCode,
    name: prod.name,
    currentPrice: prod.price,
    promotionPrice: 0,
    category: prod.category,
    description: prod.description,
    image: base64Image,
    quantity: prod.quantity,
  };
});

fs.writeFileSync("products.json", JSON.stringify(products, null, 2)); // cria o arquivo JSON com os produtos
console.log("✅ Arquivo products.json gerado com sucesso!");
