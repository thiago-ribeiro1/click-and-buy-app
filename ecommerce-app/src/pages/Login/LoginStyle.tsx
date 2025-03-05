import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#272727",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F4F4F4",
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#000",
    marginBottom: 15,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#0B8FAC",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  registerText: {
    fontSize: 14,
    color: "#272727",
    marginTop: 10,
  },
  registerLink: {
    color: "#0B8FAC",
    fontWeight: "bold",
  },
  forgotPassword: {
    textAlign: "right",
    textDecorationLine: "underline",
    color: "gray",
    marginBottom: 20,
  },
  error: {
    width: "100%",
    marginBottom: "2%",
    color: "red",
    fontWeight: "bold",
  },
});
