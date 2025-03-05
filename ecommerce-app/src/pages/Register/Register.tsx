import React, { useState } from "react";
import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "./RegisterStyle";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";
import Toast from "react-native-toast-message";

const Cadastrar: React.FC = () => {
  // Define os tipos para navegação nesta tela
  type RegisterScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Register"
  >;

  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [fullNameInput, setFullNameInput] = useState({
    value: "",
    dirty: false,
  });
  const [usernameInput, setUsernameInput] = useState({
    value: "",
    dirty: false,
  });
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

  const handleErrorFullName = () => {
    if (!fullNameInput.value && fullNameInput.dirty) {
      return <Text style={styles.error}>Campo Obrigatório*</Text>;
    } else {
      return <Text style={styles.error}> </Text>;
    }
  };

  const handleErrorUsername = () => {
    if (!usernameInput.value && usernameInput.dirty) {
      return <Text style={styles.error}>Campo Obrigatório*</Text>;
    } else {
      return <Text style={styles.error}> </Text>;
    }
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
    if (!fullNameInput.value) {
      setFullNameInput({ ...fullNameInput, dirty: true });
      hasError = true;
    }
    if (!usernameInput.value) {
      setUsernameInput({ ...usernameInput, dirty: true });
      hasError = true;
    }
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
        "Usuário cadastrado !!!",
        "Credenciais cadastradas com sucesso"
      );
      navigation.navigate("HomeScreen");
    } else {
      showMessage("error", "Erro", "Credenciais inválidas");
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
          onChangeText={(text) =>
            setFullNameInput({ value: text, dirty: true })
          }
          style={styles.input}
          placeholder="Nome Completo"
          placeholderTextColor="#777"
        />
        {handleErrorFullName()}
        <TextInput
          onChangeText={(text) =>
            setUsernameInput({ value: text, dirty: true })
          }
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#777"
        />
        {handleErrorUsername()}
        <TextInput
          onChangeText={(text) => setEmailInput({ value: text, dirty: true })}
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#777"
          keyboardType="email-address"
        />
        {handleErrorEmail()}
        <TextInput
          onChangeText={(text) =>
            setPasswordInput({ value: text, dirty: true })
          }
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#777"
          secureTextEntry
        />
        {handleErrorPassword()}

        {/* Botão de Cadastrar */}
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText} onPress={validForm}>
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

export default Cadastrar;