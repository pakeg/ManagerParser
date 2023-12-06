const InputTrans = ({ label, type, name, value, setDataUsers, errors }) => {
  return (
    <div className="relative text-black px-8">
      <input
        id={name}
        className={`focus:outline-none border bg-white w-full py-2 pl-4 peer placeholder-transparent ${
          errors && !errors[name] && 'shadow-[0_0px_4px_2px] shadow-red-500'
        }`}
        type={type}
        name={name}
        placeholder={label}
        value={value}
        onChange={(e) =>
          setDataUsers((state) => ({
            ...state,
            [name]: e.target.value,
          }))
        }
      />
      <label
        className="absolute text-[#e1e1e1] text-xs transition-all left-12 peer-placeholder-shown:text-base 
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[#e6e6e6]
          peer-focus:text-xs peer-focus:text-[#e1e1e1] peer-focus:top-0 peer-focus:translate-y-0"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
};

export default InputTrans;
