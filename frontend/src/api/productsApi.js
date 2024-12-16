import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchProducts = async ({ page, searchQuery = "", type = "" }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/products/allProducts?page=${page}&search=${searchQuery}&type=${type}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const createProduct = async ({ productData }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/products/createProduct`,
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async ({ productId, productData }) => {
  try {
    const formData = new FormData();

    // Menambahkan field satu per satu
    formData.append("name", productData.name);
    formData.append("type", productData.type);
    formData.append("price", productData.price);
    formData.append("value", productData.value);
    formData.append("description", productData.description);

    if (typeof productData.image === "string") {
      formData.append("image", null); // Gambar lama, kirim null
    } else {
      formData.append("image", productData.image); // Gambar baru
    }

    const response = await axios.put(
      `${BASE_URL}/api/products/updateProduct/${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/products/deleteProduct/${productId}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
