"use client";
import Image from "next/image";
import leftSideImg from "../app/assets/login.png";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { InputForm } from "../components/inputField/inputForm";
import toast from "react-hot-toast";
import axios from "axios";
import { setToLocalStorage } from "./utils/localStorage";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
        data
      );

      if (response) {
        toast.success("User login successfully");
        setToLocalStorage("token", response?.data?.data?.token);
        router.push(
          `/task?userId=${response?.data?.data?.user?._id}&email=${response?.data?.data?.user?.email}`
        );
        reset();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-5xl w-full p-6 mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-6">
            <div className="text-left">
              <h3 className="text-4xl font-bold text-gray-800">Login</h3>
              <p className="mt-2 text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-cyan-500">
                  Register
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
                <button
                  type="submit"
                  className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white bg-cyan-500 rounded-xl hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
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
        </div>
      </div>
    </section>
  );
};

export default HomePage;
