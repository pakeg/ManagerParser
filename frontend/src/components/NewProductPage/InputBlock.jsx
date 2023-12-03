const InputBlock = ({
  placeholder,
  type,
  value,
  setNewProduct,
  field,
  errors,
}) => {
  return (
    <div
      className={`border border-black ${
        errors && !errors[field] && 'shadow-[0_0px_4px_2px] shadow-red-500'
      }`}
    >
      <input
        type={type}
        name="title"
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          setNewProduct((state) => ({ ...state, [field]: e.target.value }))
        }
        className="focus:outline-none bg-[#dfdfdf] placeholder:text-[#b4b4b4] placeholder:text-sm w-full pl-4"
      />
    </div>
  );
};

export default InputBlock;
