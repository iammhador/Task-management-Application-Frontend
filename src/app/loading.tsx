"use client";
import { Bars } from "react-loader-spinner";

const Loading = () => {
  return (
    <div
      justify="center"
      align="middle"
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <Bars
        height="80"
        width="80"
        color="#06b6d4"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
