import { StyleSheet } from "react-native";


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 40, // Ajusta o espaçamento superior para alinhar com o protótipo
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Centraliza o título "Carrinho"
    marginBottom: 20, // Aumentar o espaçamento inferior para descer o conteúdo
    position: "relative",
  },
  cartIcon: {
    width: 32,
    height: 32,
    marginLeft: 10, 
  },
  cartTitle: {
    fontSize: 22, 
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    flex: 1, 
  },
  cartContainer: {
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12, 
  },  
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    color: "#777",
  },
  removeIcon: {
    width: 24,
    height: 24,
  },
  priceContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 8,
  },
  priceLabel: {
    fontSize: 16,
    color: "#555",
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },

  finalizarBtn: {
    backgroundColor: "#0B8FAC",
    borderRadius: 100,
    paddingVertical: 14, 
    alignItems: "center",
    marginBottom: 20,
  },
  finalizarText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    left: 0,
    zIndex: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#0B8FAC",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20, // Afastar o botão do texto
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },

  // Estilos para quando o carrinho estiver vazio
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80, 
  },

  emptyCartImage: {
    width: 160,
    height: 160,
    marginBottom: 25,
  },

  emptyCartText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#555",
  },
});
