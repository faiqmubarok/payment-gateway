import propTypes from "prop-types";

const CardProduct = ({ product, setShowModal, setSelectedProduct }) => {
  return (
    <div className="bg-white py-6 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
      <img
        loading="lazy"
        src={`${import.meta.env.VITE_BACKEND_URL}/${product?.image}`}
        className="absolute -right-5 top-2 w-32 h-auto opacity-30"
        alt={`${product?.name}`}
      />
      {/* Informasi Produk */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
        {product?.name}
      </h3>
      <p className="text-sm text-gray-600 mb-2">{product?.type}</p>
      <p className="text-xl font-bold text-gray-900 mb-4">
        Rp {product.price.toLocaleString()}
      </p>

      {/* Deskripsi Produk */}
      {product.description && (
        <p className="text-sm text-gray-500">{product?.description}</p>
      )}

      {/* Tombol beli (misal) */}
      <button
        type="button"
        className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors duration-300 font-medium"
        onClick={() => {
          setShowModal(true);
          setSelectedProduct(product);
        }}
      >
        Buy Now
      </button>
    </div>
  );
};

CardProduct.propTypes = {
  product: propTypes.object,
  setShowModal: propTypes.func,
  setSelectedProduct: propTypes.func,
};

export default CardProduct;
