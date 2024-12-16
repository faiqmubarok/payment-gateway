import propTypes from "prop-types";
import { MdDelete, MdOutlineEdit } from "react-icons/md";

const TransactionField = ({
  transaction,
  number,
  setIsModalOpen,
  setFormTransaction,
  setTypeAction,
}) => {
  const handleButtonDelete = (transaction) => {
    setIsModalOpen(true);
    setTypeAction("delete");
    setFormTransaction({
      _id: transaction._id,
      userId: {
        email:
          transaction.userId && transaction.userId.email
            ? transaction.userId.email
            : "User deleted",
      },
      productId: {
        name:
          transaction.productId && transaction.productId.name
            ? transaction.productId.name
            : "Product deleted",
      },
    });
  };

  const handleButtonEdit = (transaction) => {
    setIsModalOpen(true);
    setTypeAction("edit");
    setFormTransaction(transaction);
  };

  return (
    <>
      <tr className="bg-white border-b border-gray-100">
        <td className="px-6 py-4 max-w-[50px]">{number}</td>
        <td className="px-6 py-4 max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap uppercase">
          {transaction?._id}
        </td>
        <td className="px-6 py-4 text-nowrap">{transaction?.userId?.email}</td>
        <td className="px-6 py-4 capitalize">
          {transaction?.paymentMethod.replace(/_/g, " ")}
        </td>
        <td className="px-4 py-3 capitalize">
          <span
            className={`${
              transaction?.status === "success"
                ? "bg-green-500"
                : transaction?.status === "failed"
                ? "bg-red-500"
                : "bg-yellow-500"
            } text-white py-1 px-2 rounded-full text-xs`}
          >
            {transaction?.status}
          </span>
        </td>
        <td className="px-6 py-4 capitalize">{transaction?.transactionId}</td>
        <td className="px-6 py-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => handleButtonEdit(transaction)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold p-2 rounded"
          >
            <MdOutlineEdit />
          </button>

          <button
            type="button"
            onClick={() => handleButtonDelete(transaction)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold p-2 rounded"
          >
            <MdDelete />
          </button>
        </td>
      </tr>
    </>
  );
};

TransactionField.propTypes = {
  transaction: propTypes.object,
  number: propTypes.number,
  setIsModalOpen: propTypes.func,
  setFormTransaction: propTypes.func,
  setTypeAction: propTypes.func,
};

export default TransactionField;
