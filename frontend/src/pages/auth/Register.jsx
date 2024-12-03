import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Label, TextInput, Button } from "flowbite-react";
import Logo from "../../components/Logo";
import axios from "axios";
import Password from "../../components/Form/Password";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    noHp: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        formData
      );
      alert(res.data.message);
      if(res.status === 201){
        setFormData({
            name: "",
            email: "",
            noHp: "",
            password: "",
            confirmPassword: "",
        })
        navigate("/login")
      }
    } catch (err) {
      alert(err.response.data.message);
    }
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
          <Password
            id={"password"}
            name="password"
            labelValue="Password:"
            value={formData.password}
            onChange={handleChange}
          />
          <Password
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
