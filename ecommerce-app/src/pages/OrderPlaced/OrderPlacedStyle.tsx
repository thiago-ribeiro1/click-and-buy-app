import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aliceblue",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "60%",
    resizeMode: "cover",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#272727",
    textAlign: "center",
  },
  checkIcon: {
    width: 125,
    height: 125,
    marginBottom: 20,
  },
  secondaryAnimation: {
    width: 380,
    height: 300,
    resizeMode: "contain",
    marginTop: 15, // espaço entre a animação de cima e o título
  },
  animation: {
    width: 380,
    height: 340,
    resizeMode: "contain",
    marginBottom: 45,
  },
});
 