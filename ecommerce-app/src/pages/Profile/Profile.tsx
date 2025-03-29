import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";
import styles from "./ProfileStyle";
import * as ImagePicker from "expo-image-picker";
import { updateProfileImage } from "../../services/profileService";
import { getCurrentUser } from "../../services/authService"; // Importa a função para obter o usuário atual

const Profile: React.FC = () => {
  // Define a navegação para esta tela
  type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Profile"
  >;
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [profile, setProfile] = React.useState<any>(null); // Estado para armazenar os dados do perfil
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getCurrentUser();
        setProfile(user);
        if (user?.image) setProfileImage(user.image);
      } catch (error) {
        console.error("Erro ao obter o perfil:", error);
      }
    };
    fetchProfile();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.base64) {
      const base64Img = result.assets[0].base64;
      await updateProfileImage(base64Img); // envia para o backend
      setProfileImage(base64Img); // atualiza visualmente
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
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
        source={
          profileImage
            ? { uri: `data:image/jpeg;base64,${profileImage}` }
            : require("../../../assets/img/avatar.png")
        }
      />

      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.addPhoto}>Adicionar foto</Text>
      </TouchableOpacity>

      {/* Informações */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.info}>{profile?.name || "Carregando..."}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Username</Text>
        <Text style={styles.info}>{profile?.username || "Carregando..."}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>CPF</Text>
        <Text style={styles.info}>{profile?.cpf || "Carregando..."}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.info}>{profile?.email || "Carregando..."}</Text>
      </View>
    </View>
  );
};

export default Profile;
