import React from "react";

export const InputForm = ({ register, title, type, name, placeholder }) => {
  return (
    <div>
      <input
        {...register(title, { required: true })}
        type={type}
        name={name}
        className="block w-full px-4 py-3 text-base text-gray-800 placeholder-gray-300 border rounded-lg"
        placeholder={placeholder}
        required={true}
      />
    </div>
  );
};
