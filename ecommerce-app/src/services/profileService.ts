import api from "./httpService";

export const updateProfileImage = async (userId: string, image: string) => {
  const response = await api.post('/profile/update-image', {
    userId,
    image,
  });
  return response.data;
};

export const getUserProfileImage = async (userId: string) => {
  try {
    const response = await api.get(`/profile/${userId}`);
    return response.data?.profileImage;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.log("Foto do perfil não encontrada.");
      return null;
    }
    throw error;
  }
};
