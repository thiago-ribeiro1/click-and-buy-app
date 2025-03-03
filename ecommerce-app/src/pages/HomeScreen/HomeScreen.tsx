import React from "react";
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Importa a navegação
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";
import styles from "./HomeScreenStyle";
import { FlatList } from "react-native-gesture-handler";

const products = [
  {
    id: "1",
    image: require("../../../assets/img/tenis-lacoste.png"),
    title: "Tênis Lacoste",
    oldPrice: "R$299.99",
    price: "R$269.99",
  },
  {
    id: "2",
    image: require("../../../assets/img/mouse-redragon.png"),
    title: "Mouse Redragon",
    oldPrice: "R$150.00",
    price: "R$135.00",
  },
  {
    id: "3",
    image: require("../../../assets/img/ps5-slim.png"),
    title: "PlayStation 5 Slim",
    oldPrice: "R$3.500",
    price: "R$3.150",
  },
  {
    id: "4",
    image: require("../../../assets/img/iphone-15-pro-max.png"),
    title: "iPhone 15 Pro Max",
    oldPrice: "R$4.549",
    price: "R$4.094",
  },
  {
    id: "5",
    image: require("../../../assets/img/apple-watch.png"),
    title: "Apple Watch Series 10",
    oldPrice: "R$5.099",
    price: "R$4.589",
  },
  {
    id: "6",
    image: require("../../../assets/img/dragon-ball-sparking.png"),
    title: "Dragon Ball: Sparking! Zero - PlayStation 5",
    oldPrice: "R$359.90",
    price: "R$323.91",
  },
];

const Homepage: React.FC = () => {
  // Define os tipos para navegação nesta tela
  type HomePageScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "HomeScreen"
  >;

  const navigation = useNavigation<HomePageScreenNavigationProp>();

  const renderProduct = ({ item }: { item: (typeof products)[0] }) => (
    <View style={styles.ProductCard}>
      <Image style={styles.ProductImage} source={item.image} />
      <Text style={styles.ProductTitle}>{item.title}</Text>
      <View style={styles.PriceContainer}>
        <Text style={styles.OldPrice}>{item.oldPrice}</Text>
        <Text style={styles.ProductPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.BagContainer}>
        <Image
          style={styles.BagIcon}
          source={require("../../../assets/img/bag2.png")}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView
      style={styles.Homepage}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header com Avatar e Logout */}
      <View style={styles.Header}>
        <Image
          style={styles.Avatar}
          source={require("../../../assets/img/avatar.png")}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Image
            style={styles.Logout}
            source={require("../../../assets/img/logout.png")}
          />
        </TouchableOpacity>
      </View>

      {/* Barra de busca */}
      <View style={styles.SearchContainer}>
        <Image
          style={styles.SearchIcon}
          source={require("../../../assets/img/search.png")}
        />
        <TextInput
          style={styles.SearchInput}
          placeholder="Buscar"
          placeholderTextColor="#777"
        />
      </View>

      {/* Título Produtos */}
      <Text style={styles.Produtos}>Produtos</Text>

      {/* Produtos */}
      <View style={styles.ProductsContainer}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderProduct}
          numColumns={2}
          contentContainerStyle={styles.ProductsContainer}
        />
      </View>
    </ScrollView>
  );
};

export default Homepage;
