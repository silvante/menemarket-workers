// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const imageService = {
  uploadProfile: async (file) => {
    try {
      return await api.post(endpoints.uploadProfileImage, file, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      throw err;
    }
  },
};

export default imageService;
