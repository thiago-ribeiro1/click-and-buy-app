import React, { useState } from "react";
import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "./RegisterStyle";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";
import Toast from "react-native-toast-message";
import { signup } from "../../services/authService"; // integração com backend

const SignUp: React.FC = () => {
  // Define os tipos para navegação nesta tela
  type RegisterScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Register"
  >;

  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [usernameInput, setUsernameInput] = useState("");
  const [fullNameInput, setFullNameInput] = useState("");
  const [cpfInput, setCpfInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  // Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

  const showMessage = (type: string, title: string, message: string) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
    });
  };

  const validForm = async () => {
    // Verifica se algum campo obrigatório está vazio
    if (
      !usernameInput ||
      !fullNameInput ||
      !cpfInput ||
      !emailInput ||
      !passwordInput ||
      !confirmPasswordInput
    ) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Preencha todos os campos obrigatórios",
      });
      return;
    }
  
    // Validações detalhadas só após todos os campos estarem preenchidos
    if (fullNameInput.trim().length < 2) {
      Toast.show({ type: "error", text1: "Erro de validação", text2: "Insira no mínimo 2 caracteres no nome completo" });
      return;
    }
  
    if (!cpfRegex.test(cpfInput)) {
      Toast.show({ type: "error", text1: "Erro de validação", text2: "CPF inválido" });
      return;
    }
  
    if (!emailRegex.test(emailInput)) {
      Toast.show({ type: "error", text1: "Erro de validação", text2: "Email inválido" });
      return;
    }
  
    if (confirmPasswordInput !== passwordInput) {
      Toast.show({ type: "error", text1: "Erro de validação", text2: "As senhas não são iguais" });
      return;
    }
  
    try {
      await signup({
        username: usernameInput,
        name: fullNameInput,
        cpf: cpfInput,
        email: emailInput,
        password: passwordInput,
      });
  
      Toast.show({
        type: "success",
        text1: "Cadastro realizado com sucesso!",
        text2: "Entre na sua conta",
      });
  
      navigation.navigate("Login");
    } catch (error: any) {
      console.log("Erro ao cadastrar:", error?.response?.data || error);
      Toast.show({
        type: "error",
        text1: "Erro ao cadastrar",
        text2: "Tente novamente",
      });
    }
  };    

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Image
          style={styles.backIcon}
          source={require("../../../assets/img/botao-voltar.png")}
        />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Crie sua conta</Text>

      <View style={styles.formContainer}>
        {/* Campos de entrada */}
        <TextInput
          onChangeText={setUsernameInput}
          value={usernameInput}
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#777"
        />
        <TextInput
          onChangeText={setFullNameInput}
          value={fullNameInput}
          style={styles.input}
          placeholder="Nome Completo"
          placeholderTextColor="#777"
        />
        <TextInput
          onChangeText={setCpfInput}
          value={cpfInput}
          style={styles.input}
          placeholder="CPF"
          placeholderTextColor="#777"
        />
        <TextInput
          onChangeText={setEmailInput}
          value={emailInput}
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#777"
          keyboardType="email-address"
        />
        <TextInput
          onChangeText={setPasswordInput}
          value={passwordInput}
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#777"
          secureTextEntry
        />
        <TextInput
          onChangeText={setConfirmPasswordInput}
          value={confirmPasswordInput}
          style={styles.input}
          placeholder="Insira a senha mais uma vez"
          placeholderTextColor="#777"
          secureTextEntry
        />

        {/* Botão de Cadastrar */}
        <TouchableOpacity style={styles.registerButton} onPress={validForm}>
          <Text style={styles.registerButtonText}>
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>

      {/* Texto para login */}
      <Text style={styles.loginText}>
        Já tem uma conta?{" "}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          Fazer Login
        </Text>
      </Text>
    </View>
  );
};

export default SignUp;
