import api from './httpService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Dados para criar um novo usuário
export interface SignupData {
  username: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
}

// Dados para fazer login
export interface LoginData {
  username: string;
  password: string;
}

// obter o usuário atual
export const getCurrentUser = async () => {
  const response = await api.get("/users"); 
  currentUser = response.data;
  return response.data;
};

// usuário atual
export let currentUser: any = null;

// criar um novo usuário
export const signup = async (data: SignupData) => {
  const response = await api.post('/auth/signup', data);
  return response.data;
};

// salvar o token no AsyncStorage e o usuário atual
export const login = async (data: LoginData) => {
  const response = await api.post('/auth/login', data);
  const { token, user } = response.data;

  await AsyncStorage.setItem('authToken', token);
  currentUser = user;

  return user;
};

// remover o token quando usuário sair
export const logout = async () => {
  await AsyncStorage.removeItem('authToken');
  currentUser = null;
};

// verificar se o usuário está autenticado
export const isAuthenticated = async () => {
  const token = await AsyncStorage.getItem('authToken');
  return !!token;
};
