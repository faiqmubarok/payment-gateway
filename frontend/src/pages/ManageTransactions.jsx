import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Pagination from "../components/Pagination/Pagination";
import DefaultTable from "../components/Table/DefaultTable";
import Search from "../components/Form/Search";
import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import TransactionField from "../components/Table/TransactionField";
import { useAlert } from "../context/AlertContext";
import {
  fetchTransactions,
  updateTransaction,
  deleteTransactionId,
} from "../api/transactionApi";
import Modal from "../components/Modal/Modal";
import { Button } from "flowbite-react";
import { MdDelete } from "react-icons/md";

const INITIAL_FORM = {
  amount: 0,
  paymentMethod: "",
  status: "",
  transactionId: "",
  productId: {
    _id: "",
    name: "",
  },
  userId: {
    _id: "",
    email: "",
  },
  _id: "",
  updatedAt: "",
  createdAt: "",
};

const ManageTransactions = () => {
  const [formTransaction, setFormTransaction] = useState(INITIAL_FORM);
  const [transactions, setTransactions] = useState([]);
  const [transactionAmount, setTransactionAmount] = useState(0);
  const { showAlert } = useAlert();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeAction, setTypeAction] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500);

  const getTransactions = async () => {
    setLoading(true);
    try {
      const data = await fetchTransactions({ page, searchQuery });
      setTransactions(data?.transactions);
      setTotalPages(data?.totalPages);
      setTransactionAmount(data?.totalTransactions);
    } catch (error) {
      showAlert("error", error.message || "Failed to load transaction data");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (e) => {
    e.preventDefault();
    const actions = {
      edit: async () =>
        updateTransaction({
          _id: formTransaction._id,
          updatedData: {
            status: formTransaction.status,
          },
        }),
      delete: async () => deleteTransactionId({ _id: formTransaction._id }),
    };

    try {
      const response = await actions[typeAction]();
      if (
        response.status === 201 ||
        response.status === 200 ||
        response.status === "success"
      ) {
        showAlert(
          "success",
          response.data.message || response.data.data.message || "Success"
        );
        setFormTransaction(INITIAL_FORM);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.log(err);
      showAlert("error", err.response?.data?.message || "An error occurred");
    } finally {
      getTransactions();
    }
  };

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedQuery]);

  return (
    <>
      <Breadcrumbs pageName={"Manage Transactions"} />
      <div className="bg-white shadow-md rounded-sm border border-gray-100 flex flex-col gap-6 p-4 text-sm">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Search */}
          <div className="flex items-center gap-4 flex-col md:flex-row w-full max-w-[500px]">
            <Search
              value={searchQuery}
              setValue={setSearchQuery}
              placeholder="Search by ID Transaction"
            />
          </div>
        </div>
        <hr className="border-gray-200" />
        {debouncedQuery !== "" && (
          <p className="text-sm text-gray-700">
            Showing users with the keyword &quot;{debouncedQuery}&quot;
          </p>
        )}

        {/* Table */}
        <DefaultTable
          columns={[
            "No",
            "Transaction ID",
            "User",
            "Payment Method",
            "Status",
            "Midtrans ID",
            "Action",
          ]}
          loading={loading}
        >
          {transactions.map((transaction, index) => (
            <TransactionField
              key={index}
              number={(page - 1) * 10 + (index + 1)}
              transaction={transaction}
              setIsModalOpen={setIsModalOpen}
              setFormTransaction={setFormTransaction}
              setTypeAction={setTypeAction}
            />
          ))}
        </DefaultTable>

        {/* Pagination */}
        <div className="flex items-center justify-between gap-1.5">
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          <p className="p-2 text-gray-500">
            {transactionAmount} transactions found
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            setFormTransaction(INITIAL_FORM);
          }}
        >
          {typeAction !== "delete" && (
            <Modal.Header
              title={typeAction === "edit" && "Edit Transaction"}
              onClose={() => setIsModalOpen(false)}
            />
          )}
          <form onSubmit={handleAction} className="px-8 py-6" action="">
            {typeAction === "create" || typeAction === "edit" ? (
              <>
                <div className=" bg-white rounded-lg min-w-[320px] lg:min-w-[700px]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 text-gray-700 text-sm">
                    <div className="flex justify-between lg:col-span-2">
                      <span>Transaction ID:</span>
                      <span>{formTransaction._id || "-"}</span>
                    </div>
                    <div className="flex justify-between lg:col-span-2">
                      <span>User:</span>
                      <span>{formTransaction.userId?.email || "-"}</span>
                    </div>
                    <div className="flex justify-between lg:col-span-2">
                      <span>Product:</span>
                      <span>{formTransaction.productId?.name || "-"}</span>
                    </div>
                    <div className="flex justify-between lg:col-span-2">
                      <span>Amount:</span>
                      <span>
                        {formTransaction.amount.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between lg:col-span-2">
                      <span>Midtrans ID:</span>
                      <span>{formTransaction.transactionId || "-"}</span>
                    </div>
                    <div className="flex justify-between items-center lg:col-span-2">
                      <span>Status:</span>
                      <select
                        id="transactionStatus"
                        name="status"
                        className="border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formTransaction.status || ""}
                        onChange={(e) =>
                          setFormTransaction({
                            ...formTransaction,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="success">Success</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>
                    <div className="flex justify-between lg:col-span-2">
                      <span>Created at:</span>
                      <span>
                        {new Date(formTransaction.createdAt).toLocaleString(
                          "id-ID",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none">
                      {typeAction === "edit" && "Save"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center p-4">
                  <MdDelete className="w-16 h-16 text-gray-400" />
                </div>
                <div className="text-gray-600 text-center mb-4">
                  <div className="flex flex-col text-medium text-base mb-6">
                    <p>{formTransaction._id}</p>
                    <p>User: {formTransaction.userId.email}</p>
                    <p>Product: {formTransaction.productId.name}</p>
                  </div>
                  <p className="text-sm text-medium text-black">
                    Are you sure you want to delete this transaction?
                  </p>
                </div>
                <div className="flex items-center gap-4 flex-col md:flex-row">
                  <Button
                    className="border rounded-lg border-primary text-primary hover:bg-primary hover:text-white outline-none focus:ring-0 order-2 md:order-2"
                    size="md"
                    fullSized
                    onClick={() => {
                      setFormTransaction(INITIAL_FORM);
                      setIsModalOpen(false);
                    }}
                  >
                    No, cancel
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700 outline-none focus:ring-0 order-1 md:order-2"
                    size="md"
                    fullSized
                    type="submit"
                  >
                    Yes, I&apos;m sure
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Modal>
      )}
    </>
  );
};

export default ManageTransactions;