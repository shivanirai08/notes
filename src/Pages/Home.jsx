import React from "react";
import Navbar from "../Compoments/Navbar";
import Card from "../Compoments/Card";
import Topbar from "../Compoments/Topbar";
import { useSelector } from "react-redux";
import Opennote from "./Opennote";
import { useState } from "react";
import { startEditingNote, isFavorite } from "../redux/noteSlice";
import { useDispatch } from "react-redux";
import DeleteModal from "./DeleteModal";
import { deleteNote } from "../redux/noteSlice";

function Home() {
  const notes = useSelector((state) => state.notes.notes);
  const activeNotes = notes.filter((note) => !note.isDeleted);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const selectedNote = notes.find((n) => n.id === selectedNoteId);
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteClick = (id) => {
    setSelectedNoteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteNote({ id: selectedNoteId }));
    setShowDeleteModal(false);
    setSelectedNoteId(null);
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
          {activeNotes.map((note) => (
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
                onDelete={() => handleDeleteClick(note.id)}
                onEdit={() => dispatch(startEditingNote({ id: note.id }))}
                onFavorite={() => dispatch(isFavorite({ id: note.id }))}
                isFavorite={note.isFavorite}
              />
            </div>
          ))}

          {showDeleteModal && (
            <DeleteModal
              onConfirm={confirmDelete}
              onCancel={() => {
                setShowDeleteModal(false);
                setSelectedNoteId(null);
              }}
              isDeleted={selectedNote?.isDeleted}
            />
          )}

          {selectedNote && !showDeleteModal && (
            <Opennote
              note={selectedNote}
              onClose={() => setSelectedNoteId(null)}
              onEdit={() => dispatch(startEditingNote({ id: selectedNote.id }))}
              onDelete={() => handleDeleteClick(selectedNote.id)}
              onFavorite={() => dispatch(isFavorite({ id: selectedNote?.id }))}
              isFavorite={selectedNote?.isFavorite}
            />
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Home;
