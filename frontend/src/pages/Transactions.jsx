import CardTemplate from "../components/Card/CardTemplate";
import CardTransaction from "../components/Card/CardTransaction";
import Pagination from "../components/Pagination/Pagination";
import { useState, useEffect } from "react";
import { useTransaction } from "../context/TransactionContext";
import { CiGlobe } from "react-icons/ci";
import { SlScreenSmartphone } from "react-icons/sl";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import { getUserTransaction } from "../api/transactionApi";

const Transactions = () => {
  const userID = JSON.parse(sessionStorage.getItem("authToken")).user.id;
  const { selectedTransaction } = useTransaction();
  const [isCopied, setIsCopied] = useState(false);
  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const currentTransactions = transactions?.slice((page - 1) * 5, page * 5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTransaction = async () => {
      setLoading(true);
      try {
        const response = await getUserTransaction({ userId: userID });
        setTransactions(response);
      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    }
    getTransaction();
  }, [page, userID]);


  const handleCopy = () => {
    if (selectedTransaction) {
      navigator.clipboard.writeText(selectedTransaction._id).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
      });
    }
  };
  const formatTitleCase = (method) => {
    return method
      .split("_") // Pisahkan berdasarkan '_'
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Huruf pertama kapital
      })
      .join(" "); // Gabungkan dengan spasi
  };

  return (
    <>
      <Breadcrumbs pageName={"Transactions"} />
      <CardTemplate
        title={"Transaction Details"}
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
                  <p
                    className="max-w-20 truncate lg:max-w-full"
                    title={selectedTransaction._id}
                  >
                    {selectedTransaction._id.toUpperCase()}
                  </p>

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
                  {new Date(selectedTransaction.createdAt).toLocaleTimeString(
                    "en-GB",
                    {
                      hour: "numeric",
                      minute: "numeric",
                    }
                  )}
                  {", "}
                  {new Date(selectedTransaction.createdAt).toLocaleDateString(
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
                {selectedTransaction.product.type === "internet" && (
                  <CiGlobe className="w-6 h-6  rounded-full" />
                )}
                {selectedTransaction.product.type === "pulsa" && (
                  <SlScreenSmartphone className="w-6 h-6 rounded-full" />
                )}
                <span className="font-semibold text-lg">
                  {selectedTransaction.product.name}
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
                <h3 className="font-medium">Payment Method :</h3>
                <p>{formatTitleCase(selectedTransaction.paymentMethod)}</p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center text-base">
            No transactions selected.
          </p>
        )}
      </CardTemplate>
      <CardTemplate
        title={"Transaction History"}
        padding={"6"}
        titleClass={"text-xl font-semibold"}
        containerClass={"mb-8"}
        contentClass={"p-6"}
      >
        {loading && (
          <div className="w-full text-center text-gray-500">Loading...</div>
        )}
        {!loading && transactions.length === 0 ? (
          <div className="w-full text-center text-gray-500">
            No Transaction data.
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {currentTransactions.map((transaction, index) => (
                <CardTransaction key={index} transaction={transaction} />
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
