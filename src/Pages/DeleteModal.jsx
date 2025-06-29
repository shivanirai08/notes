import React from "react";

function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Are you sure you want to delete this note?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onConfirm()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => onCancel()}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
