import api from "./httpService";

export const updateProfileImage = async (base64Image: string) => {
  const response = await api.post("/profile/update-image", {
    image: base64Image,
  });
  return response.data;
};
