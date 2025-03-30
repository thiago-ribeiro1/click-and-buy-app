import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";
import styles from "./ProfileStyle";
import * as ImagePicker from "expo-image-picker";
import { updateProfileImage } from "../../services/profileService";
import { getCurrentUser } from "../../services/authService"; // Importa a função para obter o usuário atual
import { getUserProfileImage } from "../../services/profileService"; // Importa a função para obter a imagem do perfil	

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
        const user = await getCurrentUser(); // pegar o usuário atual 
        setProfile(user); // Atualiza o estado do perfil com os dados do usuário atual
  
        let fetchedImage = // Tenta obter a imagem do perfil do usuário
          user?.image || user?.profile?.profileImage || null;
  
        // Se a imagem não estiver disponível, tenta buscar a imagem do perfil 
        if (!fetchedImage && user?._id) {
          fetchedImage = await getUserProfileImage(user._id); // se não encontrar a imagem, tenta buscar no backend
        }
  
        setProfileImage(fetchedImage); // Atualiza o estado da imagem do perfil
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
  
    fetchProfile();
  }, []);      

  // Função para abrir o seletor de imagens
  const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'], 
    allowsEditing: true,
    base64: true,
    quality: 1,
  });

  // Verifica se o usuário cancelou a seleção ou se não há imagem selecionada 
  if (!result.canceled && result.assets?.[0]?.base64) {
    const base64Img = result.assets[0].base64;

    try {
      if (!profile?._id) {
        console.warn("Usuário não carregado ainda.");
        return;
      }

      // Verifica se a imagem já é a mesma
      await updateProfileImage(profile._id, base64Img); 
      setProfileImage(base64Img); // Envia a imagem para o backend base64
    } catch (error) {
      console.error("Erro ao atualizar imagem de perfil:", error);
    }
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
 