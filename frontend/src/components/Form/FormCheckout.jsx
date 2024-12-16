import { useState, useEffect } from "react";
import propTypes from "prop-types";
import axios from "axios";
import { TextInput, Label, Button } from "flowbite-react";
import { CiGlobe } from "react-icons/ci";
import { SlScreenSmartphone } from "react-icons/sl";
import { MdErrorOutline } from "react-icons/md";

const FormCheckout = ({ product, setShowModal }) => {
  const [formData, setFormData] = useState({
    noHp: "",
    productId: product?._id,
    amount: product?.price,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userPhone = JSON.parse(sessionStorage.getItem("authToken"))?.user?.noHp;

  useEffect(() => {
    if (userPhone) {
      setFormData((prev) => ({ ...prev, noHp: userPhone }));
    }
  }, [userPhone]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) {
      alert("Product information is missing.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/transactions/create`,
        formData
      );
      window.open(response.data.data.redirect_url, "_blank");
      if (response.status === 201) {
        setShowModal(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {/* Product Details */}
      {product && (
        <div className="mb-6 bg-gray-100 rounded-lg p-4 flex items-center gap-5">
          {product.type === "internet" && (
            <CiGlobe className="w-6 h-6 rounded-full" />
          )}
          {product.type === "pulsa" && (
            <SlScreenSmartphone className="w-6 h-6 rounded-full" />
          )}
          <div className="">
            <h2 className="font-semibold text-gray-700">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
        </div>
      )}

      <hr className="my-6" />

      {/* Phone Number Input */}
      <div className="">
        <Label htmlFor="noHp" value="Phone Number:" className="mb-2 block" />
        <TextInput
          id="noHp"
          name="noHp"
          type="tel"
          placeholder="0xx-xxxx-xxxx"
          required
          value={formData.noHp}
          onChange={handleChange}
          pattern="[0-9]{10,12}"
          className="w-full"
        />
      </div>

      <hr className="my-6" />

      <div className="grid grid-cols-2 items-center text-sm gap-2 text-gray-600">
        <span className="text-start">Product price:</span>
        <span className="text-end">Rp {product.price.toLocaleString()}</span>
        <span className="text-start">Discount:</span>
        <span className="text-end">Rp 0</span>
      </div>

      <hr className="my-6" />

      {/* Total Price */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm">Total:</span>
        <span className="text-lg font-semibold">
          Rp {product.price.toLocaleString()}
        </span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 mb-4 text-sm flex items-center gap-2 pt-4 border-t border-gray-200">
          <MdErrorOutline /> <span>{error}</span>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="bg-primary text-white w-full hover:bg-primary/90 outline-none ring-0 focus:ring-0 font-semibold"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

FormCheckout.propTypes = {
  product: propTypes.object.isRequired,
  setShowModal: propTypes.func,
};

export default FormCheckout;
