import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";
import Toast from "react-native-toast-message";
import styles from "./LoginStyle";

// Define os tipos de navegação para esta tela
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const Login: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>(); // Hook para navegação
  const [emailInput, setEmailInput] = useState({ value: "", dirty: false });
  const [passwordInput, setPasswordInput] = useState({
    value: "",
    dirty: false,
  });
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const showMessage = (type: string, title: string, message: string) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
    });
  };

  const handleErrorEmail = () => {
    if (!emailInput.value && emailInput.dirty) {
      return <Text style={styles.error}>Campo Obrigatório*</Text>;
    } else if (!emailRegex.test(emailInput.value) && emailInput.dirty) {
      return <Text style={styles.error}>Email inválido*</Text>;
    } else {
      return <Text style={styles.error}> </Text>;
    }
  };

  const handleErrorPassword = () => {
    if (!passwordInput.value && passwordInput.dirty) {
      return <Text style={styles.error}>Campo Obrigatório*</Text>;
    } else {
      return <Text style={styles.error}> </Text>;
    }
  };

  const validForm = () => {
    let hasError = false;
    if (!emailRegex.test(emailInput.value) || !emailInput.value) {
      setEmailInput({ ...emailInput, dirty: true });
      hasError = true;
    }
    if (!passwordInput.value) {
      setPasswordInput({ ...passwordInput, dirty: true });
      hasError = true;
    }

    if (!hasError) {
      showMessage(
        "success",
        "Usuário logado",
        "Credenciais válidas com sucesso"
      );
      navigation.navigate("HomeScreen");
    } else {
      showMessage("error", "Erro", "Credenciais inválidas");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entre na sua conta</Text>

      <TextInput
        onChangeText={(text) => setEmailInput({ value: text, dirty: true })}
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#777"
      />
      {handleErrorEmail()}
      <TextInput
        onChangeText={(text) => setPasswordInput({ value: text, dirty: true })}
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#777"
        secureTextEntry
      />
      {handleErrorPassword()}

      <TouchableOpacity style={styles.button} onPress={validForm}>
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
