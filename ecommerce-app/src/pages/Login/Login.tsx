import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";
import Toast from "react-native-toast-message";
import styles from "./LoginStyle";
import { login } from "../../services/authService";
import { useAuth } from "@/src/services/AuthContext";

// Tipagem de navegação
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

// Componente de Login
const Login: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [usernameInput, setUsernameInput] = useState({ value: "", dirty: false }); 
  const [passwordInput, setPasswordInput] = useState({ value: "", dirty: false });
  const { checkAuth } = useAuth(); // Importa função de autenticação

  const showMessage = (type: string, title: string, message: string) => {
    Toast.show({ type, text1: title, text2: message });
  };

  const handleLogin = async () => {
    if (!usernameInput.value || !passwordInput.value) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Preencha todos os campos obrigatórios",
      });
      return;
    }
  
    try {
      await login({
        username: usernameInput.value,
        password: passwordInput.value,
      });
  
      Toast.show({
        type: "success",
        text1: "Login efetuado com sucesso!",
      });

      checkAuth();
  
    } catch (error: any) {
      console.log("Erro ao logar:", error);
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: "Credenciais inválidas",
      });
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entre na sua conta</Text>

      <TextInput
        onChangeText={(text) => setUsernameInput({ value: text, dirty: true })}
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#777"
        value={usernameInput.value}
      />

      <TextInput
        onChangeText={(text) => setPasswordInput({ value: text, dirty: true })}
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#777"
        secureTextEntry
        value={passwordInput.value}
      />     

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Não tem uma conta?{" "}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate("Register")}
        >
          Crie uma
        </Text>
      </Text>
    </View>
  );
};

export default Login;
