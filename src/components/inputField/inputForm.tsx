import React from "react";

export const InputForm = ({ register, title, type, name, placeholder }) => {
  return (
    <div>
      <input
        {...register(title, { required: true })}
        type={type}
        name={name}
        className="block w-full px-4 py-3 text-base text-gray-800 placeholder-gray-300 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholder}
        required={true}
      />
    </div>
  );
};
