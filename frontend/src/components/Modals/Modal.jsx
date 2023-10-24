const Modal = ({ isOpen, setIsOpen, children }) => {
  return (
    isOpen && (
      <div>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          {children}
        </div>
        <div
          className="fixed w-full h-full top-0 left-0 opacity-30 bg-gray-500 z-20 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        ></div>
      </div>
    )
  );
};

export default Modal;
