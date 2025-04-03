import React, { useState, useEffect } from "react";
import { Image, Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";
import styles from "./HomeScreenStyle";
import { useCart } from "../Cart/CartContext"; // Importando o contexto
import { useAuth } from "../../services/AuthContext"; // Importando o contexto autenticação
import { getUserProfileImage } from "../../services/profileService";
import { getCurrentUser } from "../../services/authService";
import products from "../Data/products"; // Importando os produtos


const Homepage: React.FC = () => {
  type HomePageScreenNavigationProp = StackNavigationProp<RootStackParamList, "HomeScreen">;
  const navigation = useNavigation<HomePageScreenNavigationProp>();
  const { addToCart } = useCart(); // Pega a função de adicionar ao carrinho
  const { logout } = useAuth(); // Função de logout
  const [menuVisible, setMenuVisible] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Função para buscar a imagem do perfil do usuário 
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser || !currentUser._id) {
          console.warn("Usuário não encontrado ou sem ID.");
          return;
        }
  
        const imageBase64 = await getUserProfileImage(currentUser._id);
  
        if (imageBase64) {
          // Garantimos que está em base64 
          setProfileImage(`data:image/jpeg;base64,${imageBase64}`);
        } else {
          // Se não houver imagem no banco, usa o avatar padrão
          setProfileImage(null);
        }
  
      } catch (error) {
        console.error("Erro ao buscar imagem do perfil:", error);
      }
    };
  
    fetchProfileImage();
  }, []);  

  const toggleMenu = () => setMenuVisible(!menuVisible);

  // Função para adicionar ao carrinho e redirecionar para a tela do carrinho
  const handleAddToCart = (product: { id: string; title: string; price: number; image: any, productCode: string }) => {
    addToCart({ ...product, quantity: 1, productCode: product.productCode });
    navigation.navigate("Cart"); // Redireciona para a tela do carrinho após adicionar
  };

  const [searchText, setSearchText] = useState(""); // Estado da busca
  const [isSorted, setIsSorted] = useState(false); // Estado para controlar a ordenação

  // Lista de produtos
  //----------------------------------------------

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
      {/* Header com Avatar Logo e Menu */}
      <View style={styles.Header}>

        {/* Avatar */}
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            style={styles.Avatar}
            source={
              profileImage
                ? { uri: profileImage }
                : require("../../../assets/img/avatar.png")
            }
          />
        </TouchableOpacity>
        
        {/* Logo */}  
        <Image style={styles.Logo} source={require("../../../assets/img/click&buy.png")} /> 

        {/* Menu */}
        <TouchableOpacity onPress={toggleMenu}>
          <Image style={styles.MenuIcon} source={require("../../../assets/img/menu.png")} />
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <View style={styles.MenuContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Chat")} style={styles.MenuItem}>
            <Text style={styles.MenuText}>FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("MyOrders")} style={styles.MenuItem}>
            <Text style={styles.MenuText}>Meus Pedidos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout} style={styles.MenuItem}> 
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