import React, { useContext, useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../context/AuthContext";
import Cookies from "js-cookie";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  //console.log(formData)

  //form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        formData,
        {
          withCredentials: true,
        }
      );

      toast.success("Sign In successful!");

      signIn(response.data.token);

      Cookies.set("access_token", response.data.token, {
        path: "/", 
      });

      localStorage.setItem("currentUser", JSON.stringify(response.data));

      setFormData({
        email: "",
        password: "",
      });

      setTimeout(() => {
        if (response.data.isAdmin) {
          navigate("/admin/dashboard");
        } else {
          navigate("/home");
        }
      }, 1000);
    } catch (error) {
      toast.error("Signin failed: " + error.response?.data?.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full my-20">
        <Card
          color="transparent"
          shadow={true}
          className="border px-5 py-2 bg-white"
        >
          <Typography variant="h4" color="blue-gray" className="text-center">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal text-center">
            Nice to meet you! Enter your details to login.
          </Typography>
          <form
            onSubmit={handleSubmit}
            className="mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 flex flex-col">
              <Typography variant="h6" color="blue-gray">
                Email
              </Typography>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
              <Typography variant="h6" color="blue-gray">
                Password
              </Typography>
              <Input
                name="password"
                type="password"
                size="lg"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
            </div>

            <Button
              type="submit"
              className="mt-3 hover:bg-blue-gray-900"
              fullWidth
            >
              Sign In
            </Button>
            <Typography color="gray" className="font-normal">
              Dont have an account?{" "}
              <Link to="/" className="font-medium text-blue-gray-400">
                Sign Up
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
      <ToastContainer />
    </>
  );
}

export default SignIn;
