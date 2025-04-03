import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  backIcon: {
    width: 37,
    height: 37,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#272727",
  },
  ordersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  orderCard: {
    width: "48%",
    height: 200,
    borderRadius: 16,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    padding: 14,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 17,
  },
  orderImage: {
    width: "100%",
    height: 110,
    resizeMode: "contain",
    marginBottom: 10,
  },
  orderTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#272727",
    textAlign: "center",
  },
});
