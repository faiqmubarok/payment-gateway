import propTypes from "prop-types";
import { CiGlobe } from "react-icons/ci";
import { SlScreenSmartphone } from "react-icons/sl";
import { useTransaction } from "../../context/TransactionContext";

const CardTransaction = ({ transaction }) => {
  const { handleSelectTransaction, selectedTransaction } = useTransaction();
  return (
    <div
      onClick={() => handleSelectTransaction(transaction)}
      className={`p-4 border border-gray-100 rounded shadow-sm cursor-pointer hover:bg-gray-50 transition flex items-center text-sm ${
        selectedTransaction === transaction ? "border-primary" : ""
      }`}
    >
      {transaction?.product.type === "internet" && (
        <CiGlobe className="w-6 h-6 mr-5 rounded-full" />
      )}
      {transaction?.product.type === "pulsa" && (
        <SlScreenSmartphone className="w-6 h-6 mr-5 rounded-full" />
      )}
      <div className="flex justify-between gap-5 items-center w-full text-black">
        <div className="flex flex-col gap-1.5 flex-1">
          <p className="font-semibold text-base">{transaction.product.name}</p>
          <p
            className={`${
              transaction.status === "success"
                ? "text-green-500"
                : "text-yellow-500"
            }`}
          >
            {transaction.status.charAt(0).toUpperCase() +
              transaction.status.slice(1).toLowerCase()}
          </p>
          <p>
            {new Date(transaction.createdAt).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}{" "}
            {new Date(transaction.createdAt).toLocaleTimeString(
              "en-GB",
              {
                hour: "numeric",
                minute: "numeric",
              }
            )}
          </p>
        </div>
      </div>
      <p className={`font-semibold text-primary text-base`}>
        {Number(transaction.amount).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        })}
      </p>
    </div>
  );
};

CardTransaction.propTypes = {
  transaction: propTypes.object,
  selectedTransaction: propTypes.object,
  onSelectedTransaction: propTypes.func,
};

export default CardTransaction;
