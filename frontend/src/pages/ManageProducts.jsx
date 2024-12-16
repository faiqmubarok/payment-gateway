import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import { useState, useEffect } from "react";
import DefaultTable from "../components/Table/DefaultTable";
import {
  fetchProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../api/productsApi";
import Pagination from "../components/Pagination/Pagination";
import ProductField from "../components/Table/ProductField";
import { IoMdAdd } from "react-icons/io";
import Modal from "../components/Modal/Modal";
import { Button } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import FormProduct from "../components/Form/FormProduct";
import { useAlert } from "../context/AlertContext";
import Search from "../components/Form/Search";
import useDebounce from "../hooks/useDebounce";
import FilterProject from "../components/Dropdown/FilterProject";

const INITIAL_FORM = {
  _id: "",
  name: "",
  type: "pulsa",
  price: 0,
  value: 0,
  image: "",
  description: "",
};

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [formProduct, setFormProduct] = useState(INITIAL_FORM);
  const [typeAction, setTypeAction] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showAlert } = useAlert();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500);
  const [filter, setFilter] = useState("");

  const handleButtonCreate = () => {
    setIsModalOpen(true);
    setFormProduct(INITIAL_FORM);
    setTypeAction("create");
  };

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetchProducts({
        page,
        searchQuery: debouncedQuery,
        type: filter,
      });
      setProducts(response?.products);
      setTotalProducts(response?.totalProducts);
      setTotalPages(response?.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (e) => {
    e.preventDefault();
    const actions = {
      create: async () => createProduct({ productData: formProduct }),
      edit: async () =>
        updateProduct({ productId: formProduct._id, productData: formProduct }),
      delete: async () => deleteProduct(formProduct._id),
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
        setFormProduct(INITIAL_FORM);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.log(err);
      showAlert("error", err.response?.data?.message || "An error occurred");
    } finally {
      fetchProduct();
    }
  };

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedQuery, filter]);

  return (
    <>
      <Breadcrumbs pageName={"Manage Product"} />
      <div className="bg-white shadow-md rounded-sm border border-gray-100 flex flex-col gap-6 p-4 text-sm">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Search */}
          <div className="flex items-center gap-4 flex-col md:flex-row w-full md:max-w-[500px]">
            <Search
              value={searchQuery}
              setValue={setSearchQuery}
              placeholder="Search by Name"
            />
          </div>
          <div className="flex items-center w-full gap-4 md:justify-end">
            <FilterProject
              selectedFilter={filter}
              setSelectedFilter={setFilter}
              options={[
                { label: "All", value: "" },
                { label: "Pulsa", value: "pulsa" },
                { label: "Internet", value: "internet" },
              ]}
            />
            <button
              type="button"
              onClick={handleButtonCreate}
              className="px-4 py-2.5 bg-primary text-white rounded-md shadow hover:bg-primary/80 transition duration-300 font-medium flex items-center gap-2 justify-center w-1/2 md:w-auto"
            >
              <IoMdAdd className="w-5 h-5" />
              Create Product
            </button>
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
          columns={["No", "Image", "Name", "Type", "Price", "Value", "Action"]}
          loading={loading}
        >
          {products.map((product, index) => (
            <ProductField
              key={index}
              number={(page - 1) * 10 + (index + 1)}
              product={product}
              setIsModalOpen={setIsModalOpen}
              setFormProduct={setFormProduct}
              setTypeAction={setTypeAction}
            />
          ))}
        </DefaultTable>
        {/* Pagination */}
        <div className="flex items-center justify-between gap-1.5">
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          <p className="p-2 text-gray-500">{totalProducts} products found</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {typeAction !== "delete" && (
            <Modal.Header
              title={
                typeAction === "create" ? "Create Product" : "Edit Product"
              }
              onClose={() => setIsModalOpen(false)}
            />
          )}
          <form onSubmit={handleAction} className="px-8 py-6" action="">
            {typeAction === "create" || typeAction === "edit" ? (
              <>
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 min-w-[320px] md:min-w-[600px] lg:min-w-[700px] lg:gap-6 mb-8">
                  <FormProduct
                    formProduct={formProduct}
                    setFormProduct={setFormProduct}
                  />
                </div>
                <Button
                  className="bg-primary hover:bg-primary/90 outline-none focus:ring-0"
                  size="md"
                  fullSized
                  type="submit"
                >
                  {typeAction === "edit" ? "Save" : "Create"}
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center p-4">
                  <MdDelete className="w-16 h-16 text-gray-400" />
                </div>
                <div className="text-gray-600 text-center mb-4">
                  <p className="text-base text-medium mb-2">
                    {formProduct._id}
                  </p>
                  <p className="text-base text-medium mb-2">
                    Product name : {formProduct.name}
                  </p>
                  <p className="text-sm text-medium text-black">
                    Are you sure you want to delete this Product?
                  </p>
                </div>
                <div className="flex items-center gap-4 flex-col md:flex-row">
                  <Button
                    className="border rounded-lg border-primary text-primary hover:bg-primary hover:text-white outline-none focus:ring-0 order-2 md:order-2"
                    size="md"
                    fullSized
                    onClick={() => setIsModalOpen(false)}
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

export default ManageProducts;
