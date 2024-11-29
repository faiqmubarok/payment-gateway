import { Label, TextInput } from "flowbite-react";
import { useState } from "react";
import propTypes from "prop-types";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Password = ({ id, name, labelValue, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={id} value={labelValue} />
      </div>
      <div className="relative">
        <TextInput
          id={id}
          name={name}
          placeholder="••••••••"
          type={showPassword ? "text" : "password"}
          required
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-1 p-2 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <HiEye className="text-gray-400 hover:text-gray-500" />
          ) : (
            <HiEyeOff className="text-gray-400 hover:text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
};

Password.propTypes = {
  id: propTypes.string,
  labelValue: propTypes.string,
  name: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
};

export default Password;
