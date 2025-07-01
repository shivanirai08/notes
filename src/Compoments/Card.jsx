import React from "react";
import StarRateOutlinedIcon from "@mui/icons-material/StarRateOutlined";
import StarRateIcon from "@mui/icons-material/StarRate";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import { colorOptions } from "../Pages/Addnote";
import { useTheme } from "../ThemeContext";

function Card({
  title,
  content,
  date,
  color,
  isFavorite,
  onDelete,
  onEdit,
  onFavorite,
  isBinMode,
  onRestore,
}) {
  const { darkMode } = useTheme();
  const selectedColorObject = colorOptions.find((c) => c.name === color);
  return (
    <>
      <div
        className={`relative w-64 h-64 rounded-lg shadow-lg dark:drop-shadow-lg overflow-hidden group`}
        style={{
          backgroundColor: darkMode
            ? selectedColorObject?.darkhex
            : selectedColorObject?.hex,
        }}
      >
        <div className="p-4 flex flex-col justify-between h-full z-0 relative">
          {/* Title */}
          <div className="flex justify-between items-center mb-4 gap-2">
            <h3 className="font-bold text-lg truncate">{title}</h3>
            <button
              className="opacity-0 group-hover:opacity-100 group-hover:text-secondarytext dark:group-hover:text-zinc-700"
              onClick={(e) => {
                e.stopPropagation();
                onFavorite();
              }}
            >
              {isFavorite ? (
                  <StarRateIcon fontSize="small" style={{ color: "#92400E" }} />
              ) : (
                  <StarRateOutlinedIcon fontSize="small" />
              )}
            </button>
          </div>

          {/* Content */}
          <div
            className="text-sm text-gray-800 dark:text-gray-950 overflow-hidden overflow-ellipsis line-clamp-6 flex-1 flex flex-col justify-start"
            style={{ minHeight: 0 }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className="flex-1"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4 pt-4 text-xs text-gray-600 dark:text-gray-800">
            <span>{date}</span>
            <div className="space-x-2">
              {isBinMode ? (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRestore();
                    }}
                    className="opacity-0 group-hover:opacity-100 group-hover:text-secondarytext dark:group-hover:text-zinc-700">
                    <RestoreOutlinedIcon fontSize="small" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                    className="opacity-0 group-hover:opacity-100 group-hover:text-red-800 dark:group-hover:text-red-800"
                  >
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="opacity-0 group-hover:opacity-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit();
                    }}
                  >
                    <CreateOutlinedIcon fontSize="small" />
                  </button>
                  <button
                    className="opacity-0 group-hover:opacity-100 group-hover:text-red-800 dark:group-hover:text-red-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                  >
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
