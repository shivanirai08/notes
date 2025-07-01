import React  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, updateNoteField, saveNote, resetModal } from '../redux/noteSlice';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useTheme } from '../ThemeContext';
import { editNote } from '../redux/noteSlice';
import { toast } from 'react-toastify';

const Addnote = () => {
  const dispatch = useDispatch();
  const { isOpen, title, content, selectedColor } = useSelector((state) => state.notes);
  const editingNoteId = useSelector((state) => state.notes.editingNoteId);
  const { darkMode } = useTheme();

  // Handle save action
  const handleSave = () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.replace(/<(.|\n)*?>/g, '').trim(); 
    if (!trimmedTitle) {
      toast.error('Title cannot be empty or just spaces');
      return;
    }

    if (!trimmedContent) {
      toast.error('Content cannot be empty or just spaces');
      return;
    }
if (editingNoteId) {
  dispatch(
    editNote({
      id: editingNoteId,
        title,
        content,
        color: selectedColor,
    })
  );
  toast.success('Note updated successfully');
} else {
  dispatch(saveNote());
  toast.success('Note saved successfully');
}
    dispatch(resetModal());
    dispatch(closeModal());
  };
 
  const colorOptions = [
  { name: 'bluebg', hex: '#E7F6FF', darkhex: '#5FD1FA' },
  { name: 'greenbg', hex: '#EAFFFB', darkhex: '#E6EE99' },
  { name: 'purplebg', hex: '#EEE5FF', darkhex: '#B096F6' },
  { name: 'yellowbg', hex: '#FFFACA', darkhex: '#F7CB7F' },
  { name: 'orangebg', hex: '#FFE3D3', darkhex: '#EFA07A' },
  { name: 'pinkbg', hex: '#FFE8EC', darkhex: '#F4A0AF' },
];

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#23272f] rounded-xl shadow-2xl w-full max-w-2xl p-6 relative flex flex-col border border-gray-200 dark:border-gray-700">
        {/* Close */}
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          {editingNoteId ? 'Edit Note' : 'Add Note'}
        </h2>

        {/* Title */}
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</p>
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => dispatch(updateNoteField({ field: 'title', value: e.target.value }))}
          className="w-full mb-4 p-2 border border-dashed border-gray-400 dark:border-gray-600 rounded-md bg-white dark:bg-[#181c23] text-gray-900 dark:text-gray-100 outline-none"
        />

        {/* Quill Editor */}
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</p>
        <div className="my-quill flex flex-col w-full mb-4 h-36 rounded-md border border-dashed border-gray-400 dark:border-gray-600 bg-white dark:bg-[#181c23]">
          <ReactQuill
            className="w-full h-24 dark:text-gray-100 dark:bg-[#181c23]"
            theme="snow"
            value={content}
            onChange={(value) => dispatch(updateNoteField({ field: 'content', value }))}
            placeholder="Start writing your note here..."
          />
        </div>

        <div className="flex justify-between items-center">
          {/* Color Selector */}
          <div className="flex items-center gap-2">
            {colorOptions.map(({ name, hex, darkhex }) => (
              <button
                key={name}
                onClick={() => dispatch(updateNoteField({ field: 'selectedColor', value: name }))}
                className={`w-6 h-6 rounded-full border-gray-400 dark:border-gray-700 ${
                  selectedColor === name ? 'border-0 ring-2 ring-blue-700 dark:ring-blue-300' : 'border-2'
                }`}
                style={{ backgroundColor: darkMode ? darkhex : hex }}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => dispatch(closeModal())}
              className="px-4 py-2 rounded border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-[#23272f] hover:bg-gray-100 dark:hover:bg-[#181c23]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addnote;
export const colorOptions = [
  { name: 'bluebg', hex: '#E7F6FF', darkhex: '#5FD1FA' },
  { name: 'greenbg', hex: '#EAFFFB', darkhex: '#E6EE99' },
  { name: 'purplebg', hex: '#EEE5FF', darkhex: '#B096F6' },
  { name: 'yellowbg', hex: '#FFFACA', darkhex: '#F7CB7F' },
  { name: 'orangebg', hex: '#FFE3D3', darkhex: '#EFA07A' },
  { name: 'pinkbg', hex: '#FFE8EC', darkhex: '#F4A0AF' }, 
];
