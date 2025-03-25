import React, { createContext, useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentUser } from "./authService";  
import Toast from "react-native-toast-message";

// Definindo o tipo do usuário
type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  cpf: string;
};

// Definindo o tipo do contexto
type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  currentUser: User | null;
  logout: () => void;
  checkAuth: () => void; 
};

// Criando o contexto
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
  currentUser: null,
  logout: () => {},
  checkAuth: () => {},
});

// Criando o provedor de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Função para verificar autenticação
  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (token) {
        const user = await getCurrentUser(); // obtém o usuário da API com o token
        setCurrentUser(user);
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        setCurrentUser(null);
      }
    } catch (error) {
      console.log("Erro ao verificar autenticação:", error);
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Sessão expirada ou inválida",
      });
      setAuthenticated(false);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Função para deslogar
  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    setAuthenticated(false);
    setCurrentUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Retornando o provedor de autenticação
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authenticated,
        loading,
        currentUser,
        logout,
        checkAuth, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);