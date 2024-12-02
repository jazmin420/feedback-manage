import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
        "http://localhost:3000/api/auth/signup",
        formData
      );
      toast.success("Registration successful!");

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/sign-in");
      }, 1000);
    } catch (error) {
      toast.error("Registration failed: " + error.response?.data?.message);
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
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal text-center">
            Nice to meet you! Enter your details to register.
          </Typography>
          <form
            className="mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-1 flex flex-col">
              <Typography variant="h6" color="blue-gray">
                Username
              </Typography>
              <Input
                name="username"
                size="lg"
                placeholder="enter your username"
                value={formData.username}
                onChange={handleChange}
                required
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
              <Typography variant="h6" color="blue-gray">
                Email
              </Typography>
              <Input
                name="email"
                size="lg"
                placeholder="name@mail.com"
                value={formData.email}
                onChange={handleChange}
                required
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
              <Typography variant="h6" color="blue-gray">
                Password
              </Typography>
              <Input
                name="password"
                type="password"
                size="lg"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
            </div>

            <Button
              type="submit"
              className="mt-3 hover:bg-blue-gray-900"
              fullWidth
            >
              Sign Up
            </Button>
            <Typography color="gray" className="font-normal">
              Already have an account?{" "}
              <Link to="sign-in" className="font-medium text-blue-gray-400">
                Sign In
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
      <ToastContainer />
    </>
  );
}

export default SignUp;
