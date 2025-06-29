import React from 'react';
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { colorOptions } from '../Pages/Addnote';
import { useTheme } from '../ThemeContext';

const Opennote = ({ note, onClose, onEdit, onDelete, onFavorite , isFavorite }) => {
  const { darkMode } = useTheme();
  const selectedColorObject = colorOptions.find(c => c.name === note?.color);

  if (!note) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div
        className="w-full h-1/2 max-w-2xl bg-white dark:bg-zinc-900 rounded-xl shadow-xl relative p-6 overflow-hidden flex flex-col"
        style={{
          backgroundColor: darkMode ? selectedColorObject?.darkhex : selectedColorObject?.hex,
        }}
      >
        {/* Header: Title & Icons */}
        <div className="flex justify-between items-start mb-4">
          {/* Title */}
          <h2 className="text-2xl font-bold pr-20 break-words">{note.title}</h2>
          {/* Top Right Icons */}
          <div className="flex gap-3">
            <button onClick={onFavorite} className="text-gray-700 dark:text-zinc-800 hover:text-yellow-600">
              { isFavorite
                ? <StarRateIcon fontSize="small" style={{ color: '#92400E' }} />
                : <StarRateOutlinedIcon fontSize="small" />}
            </button>
            <button onClick={onEdit} className="text-gray-700 dark:text-zinc-800 hover:text-blue-600">
              <CreateOutlinedIcon />
            </button>
            <button onClick={onDelete} className="text-gray-700 dark:text-zinc-800 hover:text-red-600">
              <DeleteOutlineOutlinedIcon />
            </button>
            <button onClick={onClose} className="text-gray-700 dark:text-zinc-800 hover:text-black">
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className="prose prose-sm max-h-80 overflow-y-auto text-gray-800 dark:text-gray-900 dark:prose-invert flex-1"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />

        {/* Footer */}
        <div className="text-xs text-right text-gray-600 dark:text-gray-800 mt-6">
          {note.date}
        </div>
      </div>
    </div>
  );
};

export default Opennote;
