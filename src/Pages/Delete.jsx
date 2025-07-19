import React from "react";
import Card from "../Compoments/Card";
import Opennote from "./Opennote";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "./DeleteModal";
import {
  restoreNote,
  permanentlyDeleteNote,
} from "../redux/noteSlice";
import { toast } from "react-toastify";
import { useTheme } from "../ThemeContext";

function Delete() {
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();
  const [selectedNoteId, setSelectedNoteId] = React.useState(null);
  const deletedNotes = notes.filter((n) => n.isDeleted);
  const selectedNote = notes.find((n) => n.id === selectedNoteId);

  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [noteToDelete, setNoteToDelete] = React.useState(null);

  const handleDeleteClick = (note) => {
    setNoteToDelete(note);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (noteToDelete) {
      dispatch(permanentlyDeleteNote({ id: noteToDelete.id }));
      setShowDeleteModal(false);
      setNoteToDelete(null);
      if (selectedNoteId === noteToDelete.id) setSelectedNoteId(null);
    }
    toast.success("Note permanently deleted");
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setNoteToDelete(null);
    toast.info("Note Restored");
  };

  const { darkMode } = useTheme();

  return (
    <div
      className="flex flex-wrap gap-6 p-4"
      style={{ alignItems: "flex-start" }}
    >
      {deletedNotes.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center mt-16">
          <img
            src={darkMode ? "/assets/bin_dark.svg" : "/assets/bin.svg"}
            alt="Empty Bin"
            className="w-40 h-40 lg:w-52 lg:h-52 mb-4"
          />
          <h2 className="text-xl font-semibold mb-2 dark:text-white">No deleted notes</h2>
          <p className="text-gray-500 text-center dark:text-gray-400">
            You have no notes in the bin. Deleted notes will appear here.
          </p>
        </div>
      ) : (
        deletedNotes.map((note) => (
          <div
            key={note.id}
            onClick={() => setSelectedNoteId(note.id)}
            className="
                flex-shrink-0
                w-48 sm:w-48 md:w-56 lg:w-64
                min-h-[12rem] cursor-pointer"
          >
            <Card
              title={note.title}
              content={note.content}
              date={note.date}
              color={note.color}
              onEdit={() => console.log("Edit note")}
              onFavorite={() => console.log("Favorite note")}
              isFavorite={note.isFavorite}
              isBinMode={true}
              onRestore={() => dispatch(restoreNote({ id: note.id }))}
              onDelete={() => {
                handleDeleteClick(note);
              }}
            />
          </div>
        ))
      )}

      {selectedNote && (
        <Opennote
          note={selectedNote}
          onClose={() => setSelectedNoteId(null)}
          onEdit={() => console.log("Edit note")}
          onDelete={() => handleDeleteClick(selectedNote)}
          onFavorite={() => console.log("Favorite note")}
          isFavorite={selectedNote.isFavorite}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          note={noteToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isDeleted={noteToDelete?.isDeleted}
        />
      )}
    </div>
  );
}

export default Delete;
