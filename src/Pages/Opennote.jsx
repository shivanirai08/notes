import React from 'react';
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { colorOptions } from '../Pages/Addnote';
import { useTheme } from '../ThemeContext';

const Opennote = ({ note, onClose, onEdit, onDelete, onFavorite , isFavorite }) => {
  const { darkMode } = useTheme();
  const selectedColorObject = colorOptions.find(c => c.name === note?.color);

  if (!note) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-2 sm:px-4">
      <div
        className="w-full min-h-[50vh] sm:h-1/2 max-w-full sm:max-w-2xl bg-white dark:bg-zinc-900 rounded-xl shadow-xl relative p-3 sm:p-6 overflow-hidden flex flex-col"
        style={{
          backgroundColor: darkMode ? selectedColorObject?.darkhex : selectedColorObject?.hex,
        }}
      >
        {/* Header: Title & Icons */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
          {/* Title */}
          <h2 className="hidden sm:block md:block lg:block text-xl sm:text-2xl font-bold pr-0 sm:pr-20 break-words">{note.title}</h2>
          {/* Top Right Icons */}
          <div className="flex gap-2 sm:gap-3 self-end">
            <button onClick={onFavorite} className="text-gray-700 dark:text-zinc-800 hover:text-yellow-600">
              {isFavorite
                ? <StarRateIcon fontSize="small" style={{ color: '#92400E' }} />
                : <StarRateOutlinedIcon fontSize="small" />}
            </button>
            {note.isBinMode ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    note.onRestore && note.onRestore();
                  }}
                  className="text-gray-700 dark:text-zinc-800 hover:text-green-600"
                >
                  <RestoreOutlinedIcon fontSize="small" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  className="text-gray-700 dark:text-zinc-800 hover:text-red-600"
                >
                  <DeleteOutlineOutlinedIcon />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                    e.preventDefault();
                    onEdit();
                  }}
                  className="text-gray-700 dark:text-zinc-800 hover:text-blue-600"
                >
                  <CreateOutlinedIcon />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                    e.preventDefault();
                    onDelete();
                  }}
                  className="text-gray-700 dark:text-zinc-800 hover:text-red-600"
                >
                  <DeleteOutlineOutlinedIcon />
                </button>
              </>
            )}
            <button onClick={onClose} className="text-gray-700 dark:text-zinc-800 hover:text-black">
              <CloseIcon />
            </button>
          </div>
          {/* Title */}
          <h2 className="lg:hidden sm:hidden md:hidden text-xl sm:text-2xl font-bold pr-0 sm:pr-20 break-words">{note.title}</h2>

        </div>
        {/* Content */}
        <div
          className="prose prose-sm max-h-60 sm:max-h-80 overflow-y-auto text-gray-800 dark:text-gray-900 dark:prose-invert flex-1"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
        {/* Footer */}
        <div className="text-xs text-right text-gray-600 dark:text-gray-800 mt-4 sm:mt-6">
          {note.date}
        </div>
      </div>
    </div>
  );
};

export default Opennote
