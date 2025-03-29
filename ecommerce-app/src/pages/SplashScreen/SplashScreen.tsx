import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View, Image, StatusBar } from "react-native";

// Página Inicial
const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#0B8FAC" barStyle="light-content" />
        <LottieView
        source={require("../../../assets/animations/Animation - 1743218939341.json")}
        autoPlay
        loop
        style={styles.animation}
      />
      <Image
        style={styles.logo}
        source={require("../../../assets/img/click&buy-white.png")}  
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
    width: 240, // tamanho da logo
    height: 120,
    resizeMode: "contain", // Garante que a imagem não distorça
    marginTop: 10, // Espaço entre a logo e a animação 
  },
  animation: {
    width: 380,    
    height: 380,
    resizeMode: "contain", // Garante que a animação não distorça   
  }, 
});
