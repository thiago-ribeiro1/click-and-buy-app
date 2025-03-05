import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-start",
        alignItems: "center",
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
        width: "100%",
        height: "40%",
        backgroundColor: "#F4F4F4",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 40,
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      },
      title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#272727",
        textAlign: "center",
        marginBottom: 20,
      },
      checkIcon: {
        width: 125,
        height: 125,
        marginBottom: 20,
      },
    });
