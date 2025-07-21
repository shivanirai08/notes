import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  closeModal,
  updateNoteField,
  updateNoteInFirebase,
  addNote,
  resetModal,
} from "../redux/noteSlice";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useTheme } from "../ThemeContext";
import { toast } from "react-toastify";
import Quill from "quill";
import { useState, useEffect } from "react";
import { useRef } from "react";

const Addnote = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const { isOpen, title, content, selectedColor } = useSelector(
    (state) => state.notes
  );
  const editingNoteId = useSelector((state) => state.notes.editingNoteId);
  const { darkMode } = useTheme();
  const toastId = "title-limit-warning";
  const quillRef = useRef(null);

  const [LocalContent, setLocalContent] = useState(content);
  useEffect(() => {
    if (isOpen) {
      setLocalContent(content);
    }
  }, [content, isOpen]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "link"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
    keyboard: {
      bindings: {
        customEnter: {
          key: 13,
          handler(range, context) {
            this.quill.insertText(range.index, "\n");
            this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
            return false;
          },
        },
      },
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "indent",
    "link",
    "image",
  ];

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 30) {
      dispatch(updateNoteField({ field: "title", value: e.target.value }));
    } else {
      if (!toast.isActive(toastId)) {
        toast.warning("Title can be max 30 characters.", {
          toastId: toastId,
        });
      }
    }
  };

  // Handle save action
  const handleSave = () => {
    const trimmedTitle = title.trim();
    const trimmedContent = LocalContent.replace(/<(.|\n)*?>/g, "").trim();
    if (!trimmedTitle) {
      toast.error("Title cannot be empty or just spaces");
      return;
    }

    if (!trimmedContent) {
      toast.error("Content cannot be empty or just spaces");
      return;
    }
    if (editingNoteId) {
      dispatch(
        updateNoteInFirebase({
          noteId: editingNoteId,
          data: {
            title,
            content: LocalContent,
            color: selectedColor,
          },
        })
      );
      toast.success("Note updated successfully");
    } else {
      dispatch(updateNoteField({ field: "content", value: LocalContent }));
      dispatch(
        addNote({
          userId: uid,
          note: {
            title,
            content: LocalContent,
            color: selectedColor,
          },
        })
      )
        .unwrap()
        .then(() => toast.success("Note Saved!"))
        .catch(() => toast.error("Failed to save note"));
    }
    dispatch(resetModal());
    dispatch(closeModal());
  };

  const colorOptions = [
    { name: "bluebg", hex: "#E7F6FF", darkhex: "#5FD1FA" },
    { name: "greenbg", hex: "#EAFFFB", darkhex: "#E6EE99" },
    { name: "purplebg", hex: "#EEE5FF", darkhex: "#B096F6" },
    { name: "yellowbg", hex: "#FFFACA", darkhex: "#F7CB7F" },
    { name: "orangebg", hex: "#FFE3D3", darkhex: "#EFA07A" },
    { name: "pinkbg", hex: "#FFE8EC", darkhex: "#F4A0AF" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-2 sm:px-4">
      <div className="bg-white dark:bg-[#23272f] rounded-xl shadow-2xl w-full max-w-lg sm:max-w-xl md:max-w-2xl p-4 sm:p-6 relative flex flex-col border border-gray-200 dark:border-gray-700">
        {/* Close */}
        <button
          onClick={() => {
            dispatch(resetModal());
            dispatch(closeModal());
          }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-xl font-bold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
        >
          &times;
        </button>

        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100">
          {editingNoteId ? "Edit Note" : "Add Note"}
        </h2>

        {/* Title */}
        <p
          className="text-sm font-medium mb-1"
          style={{
            color: darkMode ? "#E5E7EB" : "#374151", // gray-300 or gray-700
          }}
        >
          Title
        </p>
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={handleTitleChange}
          className="w-full p-2 border border-dashed rounded-md bg-white dark:bg-[#181c23] outline-none text-sm sm:text-base"
          style={{
            color: darkMode ? "#F3F4F6" : "#111827", // text-gray-100 or text-gray-900
            borderColor: darkMode ? "#4B5563" : "#9CA3AF", // dark:border-gray-600 or border-gray-400
            backgroundColor: darkMode ? "#181c23" : "#fff",
            "::placeholder": {
              color: darkMode ? "#9CA3AF" : "#6B7280", // dark:gray-400 or gray-500
            },
          }}
        />
        <small
          className={`mb-3 sm:mb-4 text-xs ${
            title.length >= 30 ? "text-red-500" : ""
          }`}
          style={{
            color:
              title.length >= 30
                ? "#EF4444" // red-500
                : darkMode
                ? "#9CA3AF" // gray-400
                : "#6B7280", // gray-500
          }}
        >
          {title.length}/30
        </small>

        <div className="mb-4 ">
          <label
            className="text-sm font-medium mb-2 block"
            style={{
              color: darkMode ? "#E5E7EB" : "#1F2937", // dark:text-gray-300 or text-foreground
            }}
          >
            Content
          </label>
          <div className="border rounded-lg overflow-hidden">
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={LocalContent}
              onChange={setLocalContent}
              placeholder="Start writing your note here..."
              modules={modules}
              formats={formats}
              className="note-editor"
              style={{
                color: darkMode ? "#F3F4F6" : "#111827", // text color
                backgroundColor: darkMode ? "#181c23" : "#fff",
              }}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-row justify-between items-stretch sm:items-center lg:items-center gap-3 sm:gap-0 lg:gap-0">
          {/* Color Selector */}
          <div className="flex items-center gap-2 mb-2 sm:mb-0 lg:mb-0">
            {colorOptions.map(({ name, hex, darkhex }) => (
              <button
                key={name}
                onClick={() =>
                  dispatch(
                    updateNoteField({ field: "selectedColor", value: name })
                  )
                }
                className={`w-6 h-6 rounded-full border-gray-400 dark:border-gray-700 ${
                  selectedColor === name
                    ? "border-0 ring-2 ring-blue-700 dark:ring-white"
                    : "border-2"
                }`}
                style={{ backgroundColor: darkMode ? darkhex : hex }}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                dispatch(resetModal());
                dispatch(closeModal());
              }}
              className="px-3 sm:px-4 py-2 rounded border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-[#23272f] hover:bg-gray-100 dark:hover:bg-[#181c23]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 sm:px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
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
  { name: "bluebg", hex: "#E7F6FF", darkhex: "#5FD1FA" },
  { name: "greenbg", hex: "#EAFFFB", darkhex: "#E6EE99" },
  { name: "purplebg", hex: "#EEE5FF", darkhex: "#B096F6" },
  { name: "yellowbg", hex: "#FFFACA", darkhex: "#F7CB7F" },
  { name: "orangebg", hex: "#FFE3D3", darkhex: "#EFA07A" },
  { name: "pinkbg", hex: "#FFE8EC", darkhex: "#F4A0AF" },
];
