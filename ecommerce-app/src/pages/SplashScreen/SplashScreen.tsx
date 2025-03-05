import React from "react";
import { StyleSheet, View, Image, StatusBar } from "react-native";

// Página Inicial
const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#0B8FAC" barStyle="light-content" />
      <Image
        style={styles.logo}
        source={require("../../../assets/img/logo.png")} 
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    backgroundColor: "#0B8FAC", // Cor do fundo
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center", // Centraliza horizontalmente
  },
  logo: {
    width: 400, // tamanho da logo
    height: 400,
    resizeMode: "contain", // Garante que a imagem não distorça
  },
});
