import useScroll from '../../../hooks/useScroll';

const ModalCommentsScrollCell = ({ text }) => {
  const { isScroll, boxScroll, buttonScroll } = useScroll();

  return (
    <td className="w-full text-sm overflow-hidden">
      <div className="relative group">
        <textarea
          ref={boxScroll}
          className={`w-full bg-[#e1e1e1] resize-none focus:outline-none ml-[17px] ${
            !isScroll && 'pr-[17px]'
          }`}
          readOnly
          value={text}
        ></textarea>
        <div
          ref={buttonScroll}
          className={`absolute top-0 right-[17px] bg-black w-1 rounded opacity-0 invisible ${
            isScroll && 'group-hover:opacity-60 group-hover:visible'
          }`}
        ></div>
      </div>
    </td>
  );
};

export default ModalCommentsScrollCell;
