import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";
import styles from "./OrderPlacedStyle";

const OrderPlaced: React.FC = () => {

  // Define a navegação para esta tela
  type OrderPlacedScreenNavigationProp = StackNavigationProp<RootStackParamList, "OrderPlaced">;
  const navigation = useNavigation<OrderPlacedScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("HomeScreen"); // Substitui a tela atual pela HomeScreen em 4 segundos
    }, 4000);

    return () => clearTimeout(timer); // Evita vazamento de memória ao desmontar o componente
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Fundo Azul + Imagem */}
      <Image
        style={styles.backgroundImage}
        source={require("../../../assets/img/order-placed.png")}
      />

      {/* Conteúdo centralizado */}
      <View style={styles.content}>
        <Text style={styles.title}>Pedido Concluído</Text>

        <Image
          style={styles.checkIcon}
          source={require("../../../assets/img/concluido.png")}
        />
      </View>
    </View>
  );
};

export default OrderPlaced;