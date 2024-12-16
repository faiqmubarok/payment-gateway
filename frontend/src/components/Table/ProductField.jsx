import propTypes from "prop-types";
import { MdDelete, MdOutlineEdit } from "react-icons/md";

const ProductField = ({
  number,
  product,
  setIsModalOpen,
  setFormProduct,
  setTypeAction,
}) => {
  const handleButtonDelete = (product) => {
    setIsModalOpen(true);
    setFormProduct({
      _id: product._id,
      name: product.name,
    });
    setTypeAction("delete");
  };
  const handleButtonEdit = (product) => {
    setIsModalOpen(true);
    setFormProduct(product);
    setTypeAction("edit");
  };
  return (
    <tr className="bg-white border-b border-gray-100">
      <td className="px-6 py-4 max-w-[50px]">{number}</td>
      <td className="px-4 py-2">
        <img
          loading="lazy"
          className="w-20 h-20"
          src={`${import.meta.env.VITE_BACKEND_URL}/${product?.image}`}
          alt={product?.name}
        />
      </td>
      <td className="px-6 py-4 text-nowrap">{product?.name}</td>
      <td className="px-6 py-4 capitalize">{product?.type}</td>
      <td className="px-6 py-4 ">
        {product?.price.toLocaleString({
          style: "currency",
          currency: "IDR",
        })}
      </td>
      <td className="px-6 py-4 ">{product?.value}</td>
      <td className="px-6 py-8 flex items-center justify-end gap-2">
        <button
          onClick={() => handleButtonEdit(product)}
          type="button"
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold p-2 rounded"
        >
          <MdOutlineEdit />
        </button>

        <button
          onClick={() => handleButtonDelete(product)}
          type="button"
          className="bg-red-600 hover:bg-red-700 text-white font-bold p-2 rounded"
        >
          <MdDelete />
        </button>
      </td>
    </tr>
  );
};

ProductField.propTypes = {
  number: propTypes.number,
  product: propTypes.object,
  setIsModalOpen: propTypes.func,
  setFormProduct: propTypes.func,
  setTypeAction: propTypes.func,
};

export default ProductField;
