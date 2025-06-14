import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const Addnote = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FFFACD'); // Default color

  if (!isOpen) return null;
//   const modules = {
//   toolbar: [
//     [{ 'background': [] }], 
//     ['bold', 'italic', 'underline'],
//     [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//     ['link'],
//   ]
// };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-xl w-full max-w-2xl p-6 relative flex flex-col">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-black dark:hover:text-white">
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Add Note</h2>

        {/* Title */}
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</p>
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border border-dashed border-gray-400 dark:border-gray-600 rounded-md bg-transparent outline-none"
        />

        {/* Quill Editor */}
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</p>
        <div className="my-quill flex flex-col w-full mb-4 h-36 rounded-md border border-dashed border-gray-400 dark:border-gray-600">
          <ReactQuill
            className="w-full h-24"
            theme="snow"
            value={content}
            onChange={setContent}
            // modules={modules}
            placeholder="Start writing your note here..."
          />
        </div>

        <div className="flex justify-between items-center">
  {/* Color Selector */}
  <div className="flex items-center gap-2">

    {["#FFFACD", "#C6F6D5", "#E0E7FF", "#FCDCDC", "#FFD6A5", "#E2E8F0"].map((color) => (
      <button
        key={color}
        onClick={() => setSelectedColor(color)}
        className={`w-6 h-6 rounded-full border-2 border-gray-400 ${
          selectedColor === color ? "border-0 ring-2 ring-blue-700" : ""
        }`}
        style={{ backgroundColor: color }}
      />
    ))}
  </div>

  {/* Action Buttons */}
  <div className="flex gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">Cancel</button>
          <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Save</button>
        </div>
</div>
        
      </div>
    </div>
  );
};

export default Addnote;
