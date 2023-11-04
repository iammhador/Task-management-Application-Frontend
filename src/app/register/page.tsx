"use client";
import Image from "next/image";
import leftSideImg from "../assets/register.png";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { InputForm } from "../components/ui/form/formInput";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/auth/register`,
        data
      );
      console.log(response.data);
      if (response) {
        toast.success("User created successfully");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-5xl w-full p-6 mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 relative h-full">
            <div className="relative w-3/4 h-3/4 mx-auto">
              <Image
                src={leftSideImg}
                alt="Login Image"
                width={500}
                height={350}
                objectFit="cover"
                className="rounded-l-lg"
              />
            </div>
          </div>
          <div className="lg:w-1/2 p-6">
            <div className="text-left">
              <h3 className="text-4xl font-bold text-gray-800">Register</h3>
              <p className="mt-2 text-gray-600">
                Already have an account?{" "}
                <Link href="/" className="text-cyan-500">
                  Login
                </Link>
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <InputForm
                register={register}
                title={"email"}
                type={"text"}
                name={"email"}
                placeholder={"Enter your email"}
              />
              <InputForm
                register={register}
                title={"password"}
                type={"password"}
                name={"password"}
                placeholder={"Enter your password"}
              />
              <div className="flex flex-col mt-4">
                <input
                  type="submit"
                  className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white bg-cyan-500 rounded-xl hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
