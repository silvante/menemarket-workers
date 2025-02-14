// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const userService = {
  createWorker: async (data) => {
    try {
      return await api.post(endpoints.createWorker, data);
    } catch (err) {
      throw err;
    }
  },

  logout: async () => {
    try {
      return await api.post(endpoints.logout);
    } catch (err) {
      throw err;
    }
  },

  getUsers: async () => {
    try {
      return await api.get(endpoints.getUsers);
    } catch (err) {
      throw err;
    }
  },

  deleteUser: async (id) => {
    try {
      return await api.delete(endpoints.deleteUser(id));
    } catch (err) {
      throw err;
    }
  },

  verifyOtp: async (data) => {
    try {
      return await api.post(endpoints.verifyOtp, data);
    } catch (err) {
      throw err;
    }
  },

  resendOtp: async (data) => {
    try {
      return await api.post(endpoints.resendOtp, data);
    } catch (err) {
      throw err;
    }
  },
};

export default userService;
