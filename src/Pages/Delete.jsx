import React from "react";
import Navbar from "../Compoments/Navbar";
import Topbar from "../Compoments/Topbar";
import Card from "../Compoments/Card";
import Opennote from "./Opennote";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "./DeleteModal";
import {
  restoreNote,
  permanentlyDeleteNote,
} from "../redux/noteSlice";

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
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setNoteToDelete(null);
  };

  return (
    <div className="relative flex h-screen w-full">
      <Navbar />
      <div className="bg-zinc-50 dark:bg-zinc-900 w-full">
        <Topbar />
        <div
          className="flex flex-wrap gap-6 p-4"
          style={{ alignItems: "flex-start" }}
        >
          {deletedNotes.map((note) => (
            <div
              key={note.id}
              style={{ flex: "0 1 250px", maxWidth: "100%" }}
              onClick={() => setSelectedNoteId(note.id)}
              className="cursor-pointer"
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
          ))}
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
        </div>

        {showDeleteModal && (
          <DeleteModal
            note={noteToDelete}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            isDeleted={noteToDelete?.isDeleted}
          />
        )}
      </div>
    </div>
  );
}

export default Delete;
