import React from "react";
import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "./RegisterStyle";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";

const Cadastrar: React.FC = () => {

  // Define os tipos para navegação nesta tela
  type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, "Register">;

  const navigation = useNavigation<RegisterScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image 
          style={styles.backIcon} 
          source={require("../../../assets/img/botao-voltar.png")} 
        />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Crie sua conta</Text>

      <View style={styles.formContainer}>
        {/* Campos de entrada */}
        <TextInput style={styles.input} placeholder="Nome Completo" placeholderTextColor="#777" />
        <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#777" />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#777" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#777" secureTextEntry />

        {/* Botão de Cadastrar */}
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText} onPress={() => navigation.navigate("Login") }>Cadastrar</Text>
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