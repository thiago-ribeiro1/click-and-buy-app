import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 30,
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
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  addPhoto: {
    fontSize: 14,
    color: "#0B8FAC",
    textDecorationLine: "underline",
    marginBottom: 30,
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#F4F4F4",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    color: "#777",
    marginBottom: 4,
  },
  info: {
    fontSize: 16,
    color: "#000",
  },
});
