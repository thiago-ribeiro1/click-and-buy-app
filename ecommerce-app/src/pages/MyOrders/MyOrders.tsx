import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";
import styles from "./MyOrdersStyle";

const pedidos = [
  { id: 1, title: "Alexa", image: require("../../../assets/img/alexa.png") },
  { id: 2, title: "Fone Havit", image: require("../../../assets/img/fone-havit.png") },
  { id: 3, title: "iPhone 15 Pro Max", image: require("../../../assets/img/iphone-15-pro-max.png") },
  { id: 4, title: "Nike Air", image: require("../../../assets/img/nike-air.jpg") },
];

const MyOrders: React.FC = () => {
  type MyOrdersScreenNavigationProp = StackNavigationProp<RootStackParamList, "MyOrders">;
  const navigation = useNavigation<MyOrdersScreenNavigationProp>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Header com voltar e título */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require("../../../assets/img/botao-voltar.png")} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Meus Pedidos</Text>
      </View>

      {/* Lista de pedidos */}
      <View style={styles.ordersContainer}>
        {pedidos.map((pedido) => (
          <View key={pedido.id} style={styles.orderCard}>
            <Image source={pedido.image} style={styles.orderImage} />
            <Text style={styles.orderTitle}>{pedido.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default MyOrders;
