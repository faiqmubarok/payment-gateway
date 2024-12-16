import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "flowbite-react";
import Logo from "../../components/Logo";
import { createUser } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import FormRegister from "../../components/Form/FormRegister";
import { useAlert } from "../../context/AlertContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    noHp: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const {showAlert} = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createUser(formData);
      showAlert("success", data.data.message);
      if (data.status === 201) {
        setFormData({
          name: "",
          email: "",
          noHp: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="h-screen flex items-center w-screen text-black font-inter">
      <Card className="max-w-md w-full mx-auto">
        <div className=" p-2 mx-auto">
          <Logo />
        </div>
        <div className="">
          <h1 className="text-2xl font-bold text-primary">Create an account</h1>
          <p className="text-sm text-gray-500">Please fill in the form below</p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <FormRegister formData={formData} handleChange={handleChange} />
          <FormRegister.Password
            id={"password"}
            name="password"
            labelValue="Password:"
            value={formData.password}
            onChange={handleChange}
          />
          <FormRegister.Password
            id={"confirmPassword"}
            name="confirmPassword"
            labelValue="Confirm Password:"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            className="bg-primary ring-0 hover:bg-primary/80 mt-2.5 font-semibold focus:ring-0 focus:outline-none"
            type="submit"
          >
            Register
          </Button>
        </form>
        <span className="text-sm font-medium text-gray-600 mx-auto">
          Already have an account?{" "}
          <Link className="text-primary hover:underline" to="/login">
            Login
          </Link>
        </span>
      </Card>
    </section>
  );
};

export default Register;
