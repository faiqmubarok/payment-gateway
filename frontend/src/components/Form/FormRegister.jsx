import Password from "./Password";
import { Label, TextInput } from "flowbite-react";
import propTypes from "prop-types";

const FormRegister = ({ formData, handleChange }) => {
  return (
    <>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name:" />
        </div>
        <TextInput
          id="name"
          name="name"
          type="text"
          placeholder="Your full name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email:" />
        </div>
        <TextInput
          id="email"
          name="email"
          type="email"
          placeholder="youremail@company.com"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="noHp" value="No Hp:" />
        </div>
        <TextInput
          id="noHp"
          name="noHp"
          type="text"
          placeholder="0xx-xxxx-xxxx"
          required
          value={formData.noHp}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

FormRegister.Password = Password;

FormRegister.propTypes = {
  formData: propTypes.object,
  handleChange: propTypes.func,
};

export default FormRegister;
