const SelectField = ({ register, title, options }) => {
  return (
    <div>
      <select
        {...register(title, { required: true })}
        title={title}
        defaultValue={options.length > 0 ? options[0]?.value : ""}
        className="block w-full px-4 py-3 text-base text-gray-800 placeholder-gray-300 border rounded-lg"
      >
        {options.map((option: any) => (
          <option
            key={option.value}
            value={option.value}
            className={option.colorClass}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
