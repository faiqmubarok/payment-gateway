/* eslint-disable react-hooks/exhaustive-deps */
import CardTemplate from "../components/Card/CardTemplate";
import CardTransaction from "../components/Card/CardTransaction";
import Pagination from "../components/Pagination/Pagination";
import { useState, useEffect } from "react";
import { useTransaction } from "../hooks/TransactionContext";
import { CiGlobe } from "react-icons/ci";
import { SlScreenSmartphone } from "react-icons/sl";

const Transactions = () => {
  const dummyTransaction = [
    {
      name: "Paket Internet",
      orderID: "0192837465",
      status: "success",
      date: "2022-01-01",
      amount: 50000,
      time: "10:00",
      type: "Internet",
      paymentType : "Bank Transfer",
    },
    {
      name: "Paket Pulsa",
      orderID: "123456789",
      status: "success",
      date: "2022-01-01",
      amount: 10000,
      time: "10:00",
      type: "Pulsa",
      paymentType : "Shopeepay",
    },
    {
      name: "Paket Internet",
      orderID: "987654321",
      status: "success",
      date: "2022-01-01",
      amount: 100000,
      type: "Internet",
      paymentType : "Gopay",
    },
  ];

  const { selectedTransaction, handleSelectTransaction } = useTransaction();
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [page, setPage] = useState(1);
  const currentTransactions = transactions.slice((page - 1) * 5, page * 5);

  const handleCopy = () => {
    if (selectedTransaction) {
      navigator.clipboard.writeText(selectedTransaction.orderID).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
      });
    }
  };

  useEffect(() => {
    setTransactions(dummyTransaction);
  }, []);
  return (
    <>
      <CardTemplate
        title={"Detail Transaksi"}
        padding={"6"}
        titleClass={"text-xl font-semibold"}
        containerClass={"mb-8"}
        contentClass={"p-6 text-black text-sm flex flex-col gap-6"}
      >
        {selectedTransaction ? (
          <>
            {/* ID and date time */}
            <div className="w-full p-4 shadow-sm bg-gray-50 rounded-xl">
              <div className="flex justify-between items-center gap-4 py-2.5">
                <h3 className="font-medium">Transactions ID :</h3>
                <div className="flex items-center gap-2">
                  <p>{selectedTransaction.orderID}</p>
                  <button
                    onClick={handleCopy}
                    className="text-primary hover:underline transition font-medium"
                    title="Salin ID"
                  >
                    {isCopied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
              <hr className="text-black" />
              <div className="flex justify-between items-center gap-4 py-2.5">
                <h3 className="font-medium">Time :</h3>
                <p>
                  {selectedTransaction.time}
                  {", "}
                  {new Date(selectedTransaction.date).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>
            {/* Detail Product */}
            <div className="w-full p-4 shadow-sm bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4 py-4">
                {selectedTransaction.type === "Internet" && (
                  <CiGlobe className="w-6 h-6  rounded-full" />
                )}
                {selectedTransaction.type === "Pulsa" && (
                  <SlScreenSmartphone className="w-6 h-6 rounded-full" />
                )}
                <span className="font-semibold text-lg">
                  {selectedTransaction.name}
                </span>
              </div>
              <hr className="text-black" />
              <div className="flex justify-between items-center gap-4 py-4">
                <h3 className="font-medium">Total price :</h3>
                <p>
                  {Number(selectedTransaction.amount).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </p>
              </div>
              <hr className="text-black" />
              <div className="flex justify-between items-center gap-4 py-4">
                <h3 className="font-medium">Payment Type :</h3>
                <p>
                  {selectedTransaction.paymentType}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center">
            Tidak ada transaksi yang dipilih.
          </p>
        )}
      </CardTemplate>
      <CardTemplate
        title={"Riwayat Transaksi"}
        padding={"6"}
        titleClass={"text-xl font-semibold"}
        containerClass={"mb-8"}
        contentClass={"p-6"}
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
            <div className="flex flex-col gap-4">
              {currentTransactions.map((transaction, index) => (
                <CardTransaction
                  key={index}
                  transaction={transaction}
                  onSelectedTransaction={handleSelectTransaction}
                  selectedTransaction={selectedTransaction}
                />
              ))}
            </div>
            <div className="mt-3">
              <Pagination
                page={page}
                totalPages={Math.ceil(transactions.length / 5)}
                setPage={setPage}
              />
            </div>
          </>
        )}
      </CardTemplate>
    </>
  );
};

export default Transactions;
