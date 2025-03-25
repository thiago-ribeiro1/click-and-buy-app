import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";
import styles from "./ProductDetailsStyle";

type ProductDetailsRouteParams = {
  title: string;
  price: number;
  image: any;
};

const ProductDetails: React.FC = () => {
  type ProductDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, "ProductDetails">;
  const navigation = useNavigation<ProductDetailsScreenNavigationProp>();
  const route = useRoute();

  const { title, price, image } = route.params as ProductDetailsRouteParams;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require("../../../assets/img/botao-voltar.png")} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Produto Detalhes</Text>
      </View>

      {/* Card com conteúdo */}
      <View style={styles.card}>
        <Image source={image} style={styles.productImage} />
        <Text style={styles.productTitle}>{title}</Text>
        <Text style={styles.productPrice}>R${price.toFixed(2)}</Text>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;
