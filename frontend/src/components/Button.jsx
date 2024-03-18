function Button({ text, actionButton, icon: Icon }) {
  return (
    <div
      className="bg-teal-500 py-1 px-5 flex items-center rounded text-white cursor-pointer"
      onClick={actionButton}
    >
      <span>{text}</span>
      {Icon && (
        <span className="ml-1 mt-[3px]">
          <Icon />
        </span>
      )}
    </div>
  );
}

export default Button;
