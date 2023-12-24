import { useState } from "react";
import { formatSize } from "../utils/utilsFun";

import { PiDownloadSimpleBold } from "react-icons/pi";

export const UploadFilePage = () => {
  const [files, setFiles] = useState([]);

  const removeFiles = () => {
    const fileName = event.target.innerText.split(" ")[0];
    setFiles((state) =>
      Array.prototype.filter.call(state, (file) => file.name != fileName),
    );
  };

  const uploadFiles = () => {
    const formData = new FormData();
    formData.append("files", [...files]);
    console.log("uploadFiles");
  };

  return (
    <div className="flex items-baseline">
      <div className="flex items-center text-[#1f5f8e] text-lg font-semibold mr-20">
        <label className="block mr-3">
          <input
            type="file"
            name="prices"
            hidden
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
          <span>Загрузить файлы</span>
        </label>
        <PiDownloadSimpleBold />
      </div>
      {files.length != 0 && (
        <div>
          <div>
            <ul
              className="text-[#606060] list-decimal text-lg"
              onClick={removeFiles}
            >
              {[...files].map((file) => (
                <li
                  key={file.name}
                  className="relative after:content-[''] hover:cursor-pointer hover:bg-red-300 after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-[#606060]"
                  title="Удалить"
                >
                  {file.name}{" "}
                  <span className="text-xs">{formatSize(file.size)}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="text-lg font-semibold bg-gradient-to-b from-blue-200 to-blue-600 rounded px-8 mt-8"
            onClick={uploadFiles}
          >
            Обновить
          </button>
        </div>
      )}
    </div>
  );
};
