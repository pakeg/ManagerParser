function Button({ text, className, actionButton, icon: Icon }) {
  return (
    <div className={className} onClick={actionButton}>
      <span className="flex items-center bg-teal-500 py-1 px-5 rounded text-white cursor-pointer">
        {text}
        {Icon && <Icon className="ml-1 mt-[3px]" />}
      </span>
    </div>
  );
}

export default Button;
