import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View, Image, StatusBar } from "react-native";

// Página Inicial
const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#F0F8FF" barStyle="light-content" />
        <LottieView
        source={require("../../../assets/animations/Animation - 1743218939341.json")}
        autoPlay
        loop
        style={styles.animation}
      />
      <LottieView
        source={require("../../../assets/animations/Animation - 1743225079384.json")}
        autoPlay
        loop
        style={styles.secondaryAnimation}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    backgroundColor: "#F0F8FF", // Cor do fundo
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center", // Centraliza horizontalmente
  },
  secondaryAnimation: {
    width: 240,
    height: 120,
    resizeMode: "contain",
    marginTop: 10,
  },
  animation: {
    width: 380,    
    height: 380,
    resizeMode: "contain", // Garante que a animação não distorça   
  }, 
});
