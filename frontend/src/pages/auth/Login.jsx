import { useState } from "react";
import axios from "axios";
import { Button, Card, Label, TextInput } from "flowbite-react";
import Password from "../../components/Form/Password";
import Logo from "../../components/Logo";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        formData
      );
      alert("Login successful!");
      if (res.status === 200) {
        sessionStorage.setItem("authToken", JSON.stringify(res.data));
        navigate("/");
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Your password is wrong.");
    }
  };

  return (
    <section className="h-screen flex items-center w-screen text-black font-inter">
      <Card className="max-w-md w-full mx-auto">
        <div className=" p-2 mx-auto">
          <Logo />
        </div>
        <div className="">
          <h1 className="text-2xl font-bold text-primary">Login</h1>
          <p className="text-sm text-gray-500">Welcome back to the app</p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="emailOrPhone" value="Email:" />
            </div>
            <TextInput
              id="emailOrPhone"
              name="emailOrPhone"
              type="text"
              placeholder="Email or Phone"
              required
              value={formData.emailOrPhone}
              onChange={handleChange}
            />
          </div>
          <Password
            id="password"
            name="password"
            labelValue="Password:"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            className="bg-primary hover:bg-primary/80 mt-2.5 font-semibold focus:ring-0 focus:outline-none"
            type="submit"
          >
            Login
          </Button>
        </form>
        <span className="text-sm font-medium text-gray-600 mx-auto">
          Don&quot;t have an account?{" "}
          <Link className="text-primary hover:underline" to="/register">
            Register
          </Link>
        </span>
      </Card>
    </section>
  );
};

export default Login;
