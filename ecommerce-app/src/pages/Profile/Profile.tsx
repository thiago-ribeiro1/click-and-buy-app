import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";
import styles from "./ProfileStyle";

const Profile: React.FC = () => {
  
  // Define a navegação para esta tela
  type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Profile">;
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <View style={styles.container}>

      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            style={styles.backIcon}
            source={require("../../../assets/img/botao-voltar.png")}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Perfil</Text>
      </View>

      {/* Avatar */}
      <Image
        style={styles.avatar}
        source={require("../../../assets/img/avatar.png")}
      />
      <Text style={styles.addPhoto}>Adicionar foto</Text>

      {/* Informações */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.info}>José Silva</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Username</Text>
        <Text style={styles.info}>josesilva</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>CPF</Text>
        <Text style={styles.info}>123.456.789-01</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.info}>josesilva@email.com</Text>
      </View>
    </View>
  );
};

export default Profile;
