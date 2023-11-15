import { useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { LuCross } from 'react-icons/lu';

function InfoData({ text, newInput }) {
  const [value, setValue] = useState(text);
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex justify-between bg-[#ebebeb] rounded-md py-1.5 pl-4">
      <div className="text-black pr-1">
        {visible ? (
          <input
            type="text"
            className="focus:outline-none focus:cursor-default bg-[#ebebeb] w-full cursor-pointer"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setTimeout(() => setVisible(!visible), 150)}
          />
        ) : (
          <input
            type="text"
            className="focus:outline-none focus:cursor-default bg-[#ebebeb] w-full cursor-pointer"
            value={text}
            readOnly
            onFocus={() => setVisible(!visible)}
          />
        )}
      </div>
      <div className="flex items-center">
        <div className="mr-2 w-5 h-5">
          {value != text && visible && (
            <div className="hover:bg-green-500 bg-[#a1a1a1] rounded-sm cursor-pointer">
              <BsCheck
                size={20}
                strokeWidth="2"
                fill="white"
                title="confirm"
                onClick={() => {}}
              />
            </div>
          )}
        </div>
        {!newInput && (
          <div className="mr-2 w-5 h-5">
            <div className="hover:bg-red-500 bg-[#a1a1a1] rounded-sm cursor-pointer">
              <LuCross
                size={20}
                strokeWidth="1"
                fill="white"
                style={{
                  transform: 'rotateZ(45deg)',
                }}
                title="cancel"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoData;
