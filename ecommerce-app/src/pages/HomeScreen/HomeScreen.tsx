import React, { useState } from "react";
import { Image, Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";
import styles from "./HomeScreenStyle";
import { useCart } from "../Cart/CartContext"; // Importando o contexto

const Homepage: React.FC = () => {
  type HomePageScreenNavigationProp = StackNavigationProp<RootStackParamList, "HomeScreen">;
  const navigation = useNavigation<HomePageScreenNavigationProp>();
  const { addToCart } = useCart(); // Pega a função de adicionar ao carrinho
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  // Função para adicionar ao carrinho e redirecionar para a tela do carrinho
  const handleAddToCart = (product: { id: string; title: string; price: number; image: any }) => {
    addToCart({ ...product, quantity: 1 });
    navigation.navigate("Cart"); // Redireciona para a tela do carrinho após adicionar
  };

  const [searchText, setSearchText] = useState(""); // Estado da busca
  const [isSorted, setIsSorted] = useState(false); // Estado para controlar a ordenação

  // Lista de produtos
  const products = [
    { id: "1", title: "Tênis Lacoste", price: 269.99, image: require("../../../assets/img/tenis-lacoste.png") },
    { id: "2", title: "Mouse Redragon", price: 135.00, image: require("../../../assets/img/mouse-redragon.png") },
    { id: "3", title: "PlayStation 5 Slim", price: 3150.00, image: require("../../../assets/img/ps5-slim.png") },
    { id: "4", title: "iPhone 15 Pro Max", price: 4094.00, image: require("../../../assets/img/iphone-15-pro-max.png") },
    { id: "5", title: "Apple Watch Series 10", price: 4589.00, image: require("../../../assets/img/apple-watch.png") },
    { id: "6", title: "Dragon Ball: Sparking! Zero", price: 323.91, image: require("../../../assets/img/dragon-ball-sparking.png") },
    { id: "7", title: "Fone de Ouvido Gamer Havit", price: 162.00, image: require("../../../assets/img/fone-havit.png") },
    { id: "8", title: "MousePad Gamer", price: 45.00, image: require("../../../assets/img/mousepad.png") },
    { id: "9", title: "Controle Dual Shock PS5", price: 351.00, image: require("../../../assets/img/controle-ps5.png") },
    { id: "10", title: "Monitor Gamer Odyssey Curvo", price: 2546.00, image: require("../../../assets/img/monitor-gamer.png") },
    { id: "11", title: "Alexa", price: 360.00, image: require("../../../assets/img/alexa.png") },
    { id: "12", title: "Teclado Gamer", price: 89.00, image: require("../../../assets/img/teclado-gamer.png") }
  ];

  // Função para ordenar os produtos
  const sortedProducts = isSorted
    ? [...products].sort((a, b) => a.title.localeCompare(b.title)) // Ordena em ordem alfabética
    : products;

  // Filtra os produtos conforme o texto da busca (aplicado após a ordenação)
  const filteredProducts = sortedProducts.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView style={styles.Homepage} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
      {/* Header com Avatar Logo e Logout */}
      <View style={styles.Header}>

        {/* Avatar */}
        <Image style={styles.Avatar} source={require("../../../assets/img/avatar.png")} />
        
        {/* Logo */}  
        <Image style={styles.Logo} source={require("../../../assets/img/click&buy.png")} /> 

        {/* Menu */}
        <TouchableOpacity onPress={toggleMenu}>
          <Image style={styles.MenuIcon} source={require("../../../assets/img/menu.png")} />
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <View style={styles.MenuContainer}>
            <Text style={styles.MenuText}>Chatbot IA</Text> 
          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.MenuItem}>
            <Text style={styles.MenuText}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Barra de busca */}
      <View style={styles.SearchContainer}>
        <Image style={styles.SearchIcon} source={require("../../../assets/img/search.png")} />
        <TextInput
          style={styles.SearchInput}
          placeholder="Buscar"
          placeholderTextColor="#777"
          value={searchText}
          onChangeText={setSearchText} // Atualiza o estado da busca
        />
      </View>

      {/* Título Produtos + Ícone de Ordenação */}
      <View style={styles.ProductsHeader}>
        <Text style={styles.Products}>Produtos</Text>
        <TouchableOpacity onPress={() => setIsSorted(!isSorted)}>
          <Image 
            style={styles.SortIcon} 
            source={require("../../../assets/img/sort.png")} 
          /> 
        </TouchableOpacity>
      </View>

      {/* Lista de produtos filtrados busca */}
      <View style={styles.ProductsContainer}>
        {filteredProducts.map((product) => (
          <View key={product.id} style={styles.ProductCard}>
            <Image style={styles.ProductImage} source={product.image} />
            <Text style={styles.ProductTitle}>{product.title}</Text>
            <View style={styles.PriceContainer}>
              <Text style={styles.OldPrice}>R${(product.price * 1.1).toFixed(2)}</Text>
              <Text style={styles.ProductPrice}>R${product.price.toFixed(2)}</Text>
            </View>
            {/* Redireciona para tela de carrinho */}
            <TouchableOpacity  
              onPress={() => handleAddToCart(product)}
              style={styles.BagContainer}
            >
              <Image style={styles.BagIcon} source={require("../../../assets/img/bag2.png")} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Homepage;
