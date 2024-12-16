import propTypes from "prop-types";
import { Label, Select, TextInput, Textarea } from "flowbite-react";
import { AiOutlineCloudUpload } from "react-icons/ai";

const FormProduct = ({ formProduct, setFormProduct }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price" || name === "value") {
      // Hapus format angka sebelumnya dan ubah ke angka asli
      const numericValue = value.replaceAll(".", ""); // Hilangkan titik
      if (!isNaN(numericValue)) {
        setFormProduct({ ...formProduct, [name]: parseInt(numericValue) });
      }
    } else {
      setFormProduct({ ...formProduct, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormProduct({ ...formProduct, image: file });
  };

  const formatPrice = (price) => {
    if (!price) return "";
    return price.toLocaleString("id-ID");
  };

  return (
    <>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Product name:" />
        </div>
        <TextInput
          id="name"
          name="name"
          type="text"
          placeholder="Product Name"
          required
          value={formProduct.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="type" value="Type:" />
        </div>
        <Select
          id="type"
          name="type"
          required
          value={formProduct.type}
          onChange={handleChange}
        >
          <option value="pulsa">Pulsa</option>
          <option value="internet">Internet</option>
        </Select>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="price" value="Price (Rp):" />
        </div>
        <TextInput
          id="price"
          name="price"
          inputMode="numeric"
          type="text"
          placeholder="Price product"
          required
          value={formatPrice(formProduct.price)}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="value" value="Value:" />
        </div>
        <TextInput
          id="value"
          name="value"
          inputMode="numeric"
          type="number"
          placeholder="Value product"
          required
          value={formProduct.value}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description:" />
        </div>
        <Textarea
          id="description"
          name="description"
          className="min-h-64"
          placeholder="Product description"
          required
          value={formProduct.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="image" value="Product Image:" />
        </div>
        <div className="flex w-full items-center justify-center">
          {formProduct.image ? (
            <div className="relative flex h-64 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
              {/* Tampilkan gambar jika ada */}
              <img
                src={
                  typeof formProduct.image === "string"
                    ? `${import.meta.env.VITE_BACKEND_URL}/${formProduct?.image}` // Jika sudah ada URL (edit mode)
                    : URL.createObjectURL(formProduct.image) // Jika baru diunggah
                }
                alt="Preview"
                className="h-full w-auto rounded-lg object-cover p-4"
              />
              <button
                type="button"
                onClick={() => setFormProduct({ ...formProduct, image: null })}
                className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 rounded-lg bg-gray-500 px-6 py-4 text-sm text-white font-medium hover:bg-opacity-40 bg-opacity-10 border-white border"
              >
                Remove
              </button>
            </div>
          ) : (
            <label
              htmlFor="dropzone-file"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <AiOutlineCloudUpload className="mb-4 h-8 w-8 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG, or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                name="image"
                type="file"
                className="hidden"
                accept="image/*"
                required
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
      </div>
    </>
  );
};

FormProduct.propTypes = {
  formProduct: propTypes.object.isRequired,
  setFormProduct: propTypes.func.isRequired,
};

export default FormProduct;
