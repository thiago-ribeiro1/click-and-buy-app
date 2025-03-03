import React from "react";
import { Image, Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Importa a navegação
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";
import styles from "./HomeScreenStyle";

const Homepage: React.FC = () => {

  // Define os tipos para navegação nesta tela
  type HomePageScreenNavigationProp = StackNavigationProp<RootStackParamList, "HomeScreen">;

  const navigation = useNavigation<HomePageScreenNavigationProp>();

    return (
      <ScrollView 
        style={styles.Homepage} 
        contentContainerStyle={{ paddingBottom: 20 }} 
        showsVerticalScrollIndicator={false}
      >
        {/* Header com Avatar e Logout */}
      <View style={styles.Header}>
        <Image style={styles.Avatar} source={require("../../../assets/img/avatar.png")} />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Image style={styles.Logout} source={require("../../../assets/img/logout.png")} />
        </TouchableOpacity>
      </View>

      {/* Barra de busca */}
      <View style={styles.SearchContainer}>
        <Image style={styles.SearchIcon} source={require("../../../assets/img/search.png")} />
        <TextInput style={styles.SearchInput} placeholder="Buscar" placeholderTextColor="#777" />
      </View>

      {/* Título Produtos */}
      <Text style={styles.Produtos}>Produtos</Text>

      {/* Produtos */}
      <View style={styles.ProductsContainer}>
        {/* Produto 1 */}
        <View style={styles.ProductCard}>
          <Image style={styles.ProductImage} source={require("../../../assets/img/tenis-lacoste.png")} />
          <Text style={styles.ProductTitle}>Tênis Lacoste</Text>
          <View style={styles.PriceContainer}>
            <Text style={styles.OldPrice}>R$299.99</Text>
            <Text style={styles.ProductPrice}>R$269.99</Text>
          </View>
          <TouchableOpacity style={styles.BagContainer}>
            <Image style={styles.BagIcon} source={require("../../../assets/img/bag2.png")} />
          </TouchableOpacity>
        </View>

        {/* Produto 2 */}
        <View style={styles.ProductCard}>
          <Image style={styles.ProductImage} source={require("../../../assets/img/mouse-redragon.png")} />
          <Text style={styles.ProductTitle}>Mouse Redragon</Text>
          <View style={styles.PriceContainer}>
            <Text style={styles.OldPrice}>R$150.00</Text>
            <Text style={styles.ProductPrice}>R$135.00</Text>
          </View>
          <TouchableOpacity style={styles.BagContainer}>
            <Image style={styles.BagIcon} source={require("../../../assets/img/bag2.png")} />
          </TouchableOpacity>
        </View>

        {/* Produto 3 */}
        <View style={styles.ProductCard}>
          <Image style={styles.ProductImage} source={require("../../../assets/img/ps5-slim.png")} />
          <Text style={styles.ProductTitle}>PlayStation 5 Slim</Text>
          <View style={styles.PriceContainer}>
            <Text style={styles.OldPrice}>R$3.500</Text>
            <Text style={styles.ProductPrice}>R$3.150</Text>
          </View>
          <TouchableOpacity style={styles.BagContainer}>
            <Image style={styles.BagIcon} source={require("../../../assets/img/bag2.png")} />
          </TouchableOpacity>
        </View>

        {/* Produto 4 */}
        <View style={styles.ProductCard}>
          <Image style={styles.ProductImage} source={require("../../../assets/img/iphone-15-pro-max.png")} />
          <Text style={styles.ProductTitle}>iPhone 15 Pro Max</Text>
          <View style={styles.PriceContainer}>
            <Text style={styles.OldPrice}>R$4.549</Text>
            <Text style={styles.ProductPrice}>R$4.094</Text>
          </View>
          <TouchableOpacity style={styles.BagContainer}>
            <Image style={styles.BagIcon} source={require("../../../assets/img/bag2.png")} />
          </TouchableOpacity>
        </View>

        {/* Produto 5 */}
        <View style={styles.ProductCard}>
          <Image style={styles.ProductImage} source={require("../../../assets/img/apple-watch.png")} />
          <Text style={styles.ProductTitle}>Apple Watch Series 10</Text>
          <View style={styles.PriceContainer}>
            <Text style={styles.OldPrice}>R$5.099</Text>
            <Text style={styles.ProductPrice}>R$4.589</Text>
          </View>
          <TouchableOpacity style={styles.BagContainer}>
            <Image style={styles.BagIcon} source={require("../../../assets/img/bag2.png")} />
          </TouchableOpacity>
        </View>

        {/* Produto 6 */}
        <View style={styles.ProductCard}>
          <Image style={styles.ProductImage} source={require("../../../assets/img/dragon-ball-sparking.png")} />
          <Text style={styles.ProductTitle}>Dragon Ball: Sparking! Zero - PlayStation 5</Text>
          <View style={styles.PriceContainer}>
            <Text style={styles.OldPrice}>R$359.90</Text>
            <Text style={styles.ProductPrice}>R$323.91</Text>
          </View>
          <TouchableOpacity style={styles.BagContainer}>
            <Image style={styles.BagIcon} source={require("../../../assets/img/bag2.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>   
    
  );
};

export default Homepage;
