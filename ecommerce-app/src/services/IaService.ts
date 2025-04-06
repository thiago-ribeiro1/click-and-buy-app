import api from './httpService';

export const sendPromptToIA = async (userId: string, prompt: string) => {
  try {
    const response = await api.post('/users/ia', { userId, prompt });
    return response.data;
  } catch (error: any) {
    console.error('Erro ao enviar prompt para IA:', error);
    throw error.response?.data || { message: 'Erro inesperado ao comunicar com a IA' };
  }
};