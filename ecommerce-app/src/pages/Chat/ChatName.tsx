import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";


const ChatName = () => {
  const [name, setName] = useState("");
  
   type ChatNameScreenNavigationProp = StackNavigationProp<RootStackParamList, "ChatName">;
   const navigation = useNavigation<ChatNameScreenNavigationProp>();

  const handleEnter = () => {
    if (name.trim()) {
      navigation.navigate("Chat", { chatName: name.trim() });
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Digite seu nome:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 20,
          borderRadius: 8,
        }}
        placeholder="Seu nome"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity
        onPress={handleEnter}
        style={{
          backgroundColor: "#4fd1c5",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>Entrar no chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatName;
