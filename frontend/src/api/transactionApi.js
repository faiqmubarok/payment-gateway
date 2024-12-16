import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchTransactions = async ({ page, searchQuery = "" }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/transactions/getAllTransaction?page=${page}&search=${searchQuery}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const getUserTransaction = async ({ userId }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/transactions/getUserTransactions/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    throw error;
  }
};

export const montlyTransaction = async ({ userId }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/transactions/getMonthlyTransactionTotals/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    throw error;
  }
};

export const updateTransaction = async ({ _id, updatedData }) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/transactions/updateTransaction/${_id}`,
      updatedData
    );
    return response;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};

export const deleteTransactionId = async ({ _id }) => {
  try {
    console.log(_id);
    const response = await axios.delete(
      `${BASE_URL}/api/transactions/deleteTransaction/${_id}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};
