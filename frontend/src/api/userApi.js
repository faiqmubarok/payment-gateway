import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchUsers = async ({ page, searchQuery = "" }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/users/getUsers?page=${page}&search=${searchQuery}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/register`,
      userData
    );
    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/users/deleteUser/${userId}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const updateUser = async (userId, updatedData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/users/updateUser/${userId}`,
      updatedData
    );
    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
