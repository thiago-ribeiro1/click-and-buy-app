import React, { useEffect } from "react";
import { Text, View, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";
import styles from "./OrderPlacedStyle";
import { useCart } from "../Cart/CartContext";
import LottieView from "lottie-react-native";

const OrderPlaced: React.FC = () => {
  // Define a navegação para esta tela
  type OrderPlacedScreenNavigationProp = StackNavigationProp<RootStackParamList, "OrderPlaced">;
  const navigation = useNavigation<OrderPlacedScreenNavigationProp>();
  const { clearCart } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      clearCart();
      navigation.replace("HomeScreen"); // Substitui a tela atual pela HomeScreen em 4 segundos
    }, 4000);

    return () => clearTimeout(timer); // Evita vazamento de memória ao desmontar o componente
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="aliceblue" barStyle="light-content" />
      
      {/* Animação de cima */}
      <LottieView
        source={require("../../../assets/animations/Animation - 1743648942565.json")}
        autoPlay
        loop
        style={styles.secondaryAnimation}
      />

      {/* Conteúdo centralizado */}
      <View style={styles.content}>
        <Text style={styles.title}>Pedido Concluído</Text>

        {/* Animação Maquininha */}
        <LottieView
          source={require("../../../assets/animations/Animation - 1743649215050.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
    </View>
  );
};

export default OrderPlaced;