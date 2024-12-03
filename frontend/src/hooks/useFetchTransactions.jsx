import { useEffect, useState } from "react";
import axios from "axios";
import propTypes from "prop-types";

const useFetchTransactions = ({ userID }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/transactions/getUserTransactions/${userID}`
        );
        setTransactions(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [userID]);

  return { transactions, loading };
};

useFetchTransactions.propTypes = {
  userID: propTypes.string,
};

export default useFetchTransactions;
