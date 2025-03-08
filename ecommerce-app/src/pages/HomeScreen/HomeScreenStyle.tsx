import { StyleSheet } from "react-native";

export default StyleSheet.create({
  Homepage: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  // HEADER - Avatar e Logout
  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  Avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  Logout: {
    width: 32,
    height: 32,
  },

  // SEARCH BAR
  SearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  SearchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  SearchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },

  // Título "Produtos"
  Products: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 14,
  },

  // GRID DE PRODUTOS
  ProductsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12, // 🔹 Melhor espaçamento entre os cards
  },

  ProductsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  SortIcon: {
    width: 24,
    height: 24,
    tintColor: "#333", 
  },

  // CARTÃO DE PRODUTO
  ProductCard: {
    width: "48%", // Mantém 2 produtos por linha
    height: 260, 
    borderRadius: 16,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    padding: 14,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3, // Sombreamento no Android
    position: "relative",
  },
  ProductImage: {
    width: "100%",
    height: 140, 
    resizeMode: "contain",
  },
  ProductTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#272727",
    textAlign: "center",
  },
  
  // PREÇO
  PriceContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  OldPrice: {
    fontSize: 14,
    color: "#777",
    textDecorationLine: "line-through",
  },
  ProductPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#272727",
  },

  // ÍCONE DA SACOLA 
  BagContainer: {
    position: "absolute",
    top: 8, // Alinhado no canto superior direito
    right: 8,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  BagIcon: {
    width: 20,
    height: 20,
  },
});
