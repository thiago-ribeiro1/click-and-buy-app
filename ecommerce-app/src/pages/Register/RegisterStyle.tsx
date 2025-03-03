import { StyleSheet } from "react-native"; 

export default StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#fff",
      },
      backButton: {
        position: "absolute",
        top: 50,
        left: 20,
        zIndex: 10, // Garante que o botão fique acima de tudo
      },
      backIcon: {
        width: 37,
        height: 37,
      },
      title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#272727",
        marginBottom: 20,
        textAlign: "center",
      },
      formContainer: {
        width: "100%",
        alignItems: "center",
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
      registerButton: {
        width: "100%",
        height: 50,
        backgroundColor: "#0B8FAC",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
      },
      registerButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
      },
      loginText: {
        color: "#272727",
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
        marginTop: 15,
      },
      loginLink: {
        color: "#0B8FAC",
        fontWeight: "bold",
      },
    });