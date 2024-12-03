import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import { CiGlobe } from "react-icons/ci";
import { SlScreenSmartphone } from "react-icons/sl";
import { useState } from "react";
import Modal from "../components/Modal/Modal";
import CardProduct from "../components/Card/CardProduct";
import useFetchProducts from "../hooks/useFetchProducts";
import FormCheckout from "../components/Form/FormCheckout";

const Product = () => {
  const [activeTab, setActiveTab] = useState("pulsa");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { products, loading } = useFetchProducts({ activeTab });

  return (
    <>
      <Breadcrumbs pageName={"Product"} />
      <div className="rounded-sm border border-gray-100 bg-white shadow-md">
        <div className="border-b border-gray-200 p-4 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setActiveTab("pulsa")}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              activeTab === "pulsa"
                ? "bg-primary text-white"
                : "hover:text-white hover:bg-primary text-black"
            }`}
          >
            <SlScreenSmartphone className="w-6 h-6" />
            <h3 className="font-medium">Pulsa</h3>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("internet")}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              activeTab === "internet"
                ? "bg-primary text-white"
                : "hover:text-white hover:bg-primary text-black"
            }`}
          >
            <CiGlobe className="w-6 h-6" />
            <h3 className="font-medium">Internet</h3>
          </button>
        </div>
        <div className="p-4">
          {loading && <p className="text-center">Loading...</p>}
          {loading && !products && (
            <p className="text-center">No Products...</p>
          )}
          {!loading && products && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {products.map((product) => (
                <CardProduct
                  key={product._id}
                  product={product}
                  setShowModal={setShowModal}
                  setSelectedProduct={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Modal.Header title="Checkout" onClose={() => setShowModal(false)} />
          <FormCheckout product={selectedProduct} />
        </Modal>
      )}
    </>
  );
};

export default Product;
