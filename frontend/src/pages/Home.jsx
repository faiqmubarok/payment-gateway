import CardTemplate from "../components/Card/CardTemplate";
import CardDataStats from "../components/Card/CardDataStats";
import { CiGlobe } from "react-icons/ci";
import { SlScreenSmartphone } from "react-icons/sl";
import CardTransaction from "../components/Card/CardTransaction";
import { useState, useEffect } from "react";
import axios from "axios";
import { getUserTransaction, montlyTransaction } from "../api/transactionApi";
import GraphicChart from "../components/Chart/Chart";

const Home = () => {
  const userID = JSON.parse(sessionStorage.getItem("authToken")).user.id;
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [dataMontlyTransaction, setDataMontlyTransaction] = useState([]);
  const [wallet, setWallet] = useState({});

  useEffect(() => {
    const getWalletAndTransactions = async () => {
      setLoading(true);
      try {
        const walletResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/getWallet/${userID}`
        );
        setWallet(walletResponse.data);

        const transactionsResponse = await getUserTransaction({
          userId: userID,
        });
        setTransactions(transactionsResponse);

        const monthlyResponse = await montlyTransaction({ userId: userID });
        setDataMontlyTransaction(monthlyResponse);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getWalletAndTransactions();
  }, [userID]);

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <CardDataStats
          title={"Total Pulsa"}
          total={`Rp. ${(wallet?.pulsa || 0).toLocaleString()}`}
        >
          <SlScreenSmartphone className="w-7 h-7" />
        </CardDataStats>
        <CardDataStats
          title={"Total Kuota"}
          total={`${(wallet?.internet / 1024).toFixed(1)} Gb`}
        >
          <CiGlobe className="w-7 h-7" />
        </CardDataStats>
        <CardDataStats></CardDataStats>
      </section>
      <section className="grid grid-cols-12 gap-6">
        <CardTemplate
          title={"Latest Transactions"}
          padding={"5"}
          titleClass={"text-xl font-semibold"}
          containerClass={"mb-6 col-span-12 lg:col-span-5"}
          contentClass={
            "md:h-[450px] overflow-y-auto space-y-4 p-5 no-scrollbar"
          }
        >
          {loading && (
            <div className="w-full text-center text-gray-500">Memuat...</div>
          )}
          {!loading && transactions.length === 0 ? (
            <div className="w-full text-center text-gray-500">
              Tidak ada data Transaksi.
            </div>
          ) : (
            <>
              {transactions.slice(0, 5).map((transaction) => (
                <CardTransaction
                  key={transaction._id}
                  transaction={transaction}
                />
              ))}
            </>
          )}
        </CardTemplate>
        <CardTemplate
          title={"Transaction Graphic"}
          padding={"5"}
          titleClass={"text-xl font-semibold"}
          containerClass={"mb-6 col-span-12 lg:col-span-7"}
          contentClass={
            "overflow-y-auto space-y-4 p-5 no-scrollbar"
          }
        >
          <GraphicChart data={dataMontlyTransaction} loading={loading} />
        </CardTemplate>
      </section>
    </>
  );
};

export default Home;
