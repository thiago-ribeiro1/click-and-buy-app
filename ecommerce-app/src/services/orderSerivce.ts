import api from "./httpService";

// Função para criar um novo pedido
export const createOrder = async (orderData: any) => {
    try {
      const response = await api.post("/orders", orderData);
      return response.data; // Retorna os dados da resposta
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      throw error; // Propaga o erro para ser tratado onde a função for chamada
    }
  };

// Função para buscar os pedidos de um usuário
export const getUserOrders = async (userId: string) => {
    try {
      const response = await api.get(`/orders/user/${userId}`);
      return response.data; // Retorna os pedidos do usuário
    } catch (error) {
      console.error("Erro ao buscar pedidos do usuário:", error);
      throw error; // Propaga o erro para ser tratado onde a função for chamada
    }
  };