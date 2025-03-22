import React from "react";
import { Image, Text, View, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";
import styles from "./CartStyle";
import { useCart } from "../Cart/CartContext"; // Importa o contexto do carrinho

const Cart: React.FC = () => {
  type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, "Cart">;
  const navigation = useNavigation<CartScreenNavigationProp>();

  const { cartItems, removeFromCart, total } = useCart(); // Pega os produtos do carrinho
  const isCartEmpty = cartItems.length === 0; // Define se o carrinho está vazio

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Botão de voltar */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require("../../../assets/img/botao-voltar.png")} style={styles.cartIcon} />
        </TouchableOpacity>
        <Text style={styles.cartTitle}>Carrinho</Text>
      </View>

      {/* Verifica se o carrinho está vazio */}
      {isCartEmpty ? (
        <View style={styles.emptyCartContainer}>
          <Image 
            source={require("../../../assets/img/bag-empty-cart.png")} // Imagem quando o carrinho estiver vazio
            style={styles.emptyCartImage} 
          />
          <Text style={styles.emptyCartText}>Seu Carrinho está Vazio</Text> 
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("HomeScreen")}>
                  <Text style={styles.buttonText}>Acessar Produtos</Text>
                </TouchableOpacity>
        </View>
      ) : (
        
        <>
          {/* Lista de Produtos no Carrinho */}
          <FlatList
            data={cartItems}
            keyExtractor={(item) => `${item.id}-${item.quantity}`} // Gera uma chave única combinando id e quantidade
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={item.image} style={styles.productImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.productName}>{item.title}</Text>
                  <Text style={styles.productPrice}>R${item.price.toFixed(2)}</Text>
                  <Text style={styles.productQuantity}>Quantidade: {item.quantity}</Text>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Image source={require("../../../assets/img/remover.png")} style={styles.removeIcon} />
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Valores */}
          <View style={styles.priceContainer}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Subtotal</Text>
              <Text style={styles.priceValue}>R${total.toFixed(2)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Taxas</Text>
              <Text style={styles.priceValue}>R$0.00</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>R${total.toFixed(2)}</Text>
            </View>
          </View>

          {/* Botão Finalizar Pedido */}
          <TouchableOpacity onPress={() => navigation.navigate("OrderPlaced")} style={styles.finalizarBtn}>
            <Text style={styles.finalizarText}>Finalizar Pedido</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Cart;
