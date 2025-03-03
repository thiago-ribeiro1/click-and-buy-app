import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes"; 
import styles from "./LoginStyle";

// Define os tipos de navegação para esta tela
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

const Login: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();  // Hook para navegação


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entre na sua conta</Text> 

      <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#777" />
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#777" secureTextEntry />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={() => navigation.navigate("HomeScreen")}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Não tem uma conta?{" "}
        <Text style={styles.registerLink} onPress={() => navigation.navigate("Register")}>
          Cadastre-se
        </Text>
      </Text>
    </View>
  );
};

export default Login;

