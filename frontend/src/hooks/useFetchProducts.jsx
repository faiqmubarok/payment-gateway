import { useState, useEffect } from "react";
import axios from "axios";

const useFetchProducts = ({ activeTab }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${activeTab}`
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeTab]);
  
  return { products, loading };
};

export default useFetchProducts;
