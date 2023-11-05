"use client";
import { useEffect, useState } from "react";
import { getFromLocalStorage } from "../utils/localStorage";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import Navbar from "../../components/ui/navbar";

const PrivateLayout = ({ children }) => {
  const router = useRouter();
  const userLoggedIn = getFromLocalStorage("token");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/");
    }
    setLoading(true);
  }, [router, userLoggedIn]);

  if (!isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default PrivateLayout;
