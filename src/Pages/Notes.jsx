import React from 'react'
import Card from '../Compoments/Card'
import Opennote from './Opennote'
import { useSelector, useDispatch } from 'react-redux'
import { startEditingNote, isFavorite } from '../redux/noteSlice'
import { useState } from 'react'
import DeleteModal from './DeleteModal'
import { deleteNote } from '../redux/noteSlice'
import { toast } from 'react-toastify'



const Notes = ({type}) => {
    const notes = useSelector((state) => state.notes.notes);
    const searchText = useSelector((state) => state.notes.searchText);
    const [selectedNoteId, setSelectedNoteId] = useState(null);
  const selectedNote = notes.find((n) => n.id === selectedNoteId);
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  var filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleDeleteClick = (id) => {
    setSelectedNoteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteNote({ id: selectedNoteId }));
    setShowDeleteModal(false);
    setSelectedNoteId(null);
    toast.success("Note deleted successfully");
  };
  const favoriteToastId = 'fav-toast';

    if (type === "favorite") {
        filteredNotes = filteredNotes.filter(note => note.isFavorite && !note.isDeleted);
    }
    if (type === "all") {
        filteredNotes = filteredNotes.filter(note => !note.isDeleted);
    }
  return (
        <div
          className="flex flex-wrap gap-3 p-2 sm:gap-4 sm:p-3 md:gap-5 md:p-4"
          style={{ alignItems: "flex-start" }}
        >
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="
                cursor-pointer
                flex-shrink-0
                w-48 sm:w-48 md:w-56 lg:w-64
                min-h-[12rem]
              "
              onClick={() => setSelectedNoteId(note.id)}
            >
              <Card
                title={note.title}
                content={note.content}
                date={note.date}
                color={note.color}
                onDelete={() => handleDeleteClick(note.id)}
                onEdit={() => dispatch(startEditingNote({ id: note.id }))}
                onFavorite={() => {
                  dispatch(isFavorite({ id: note.id }));
                  toast.info(
                    note.isFavorite
                      ? "Note removed from favorites"
                      : "Note marked as favorite"
                  , { toastId: favoriteToastId });
                }}
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
                toast.info("Deletion cancelled");
              }}
              isDeleted={selectedNote?.isDeleted}
            />
          )}

          <Opennote
            note={selectedNote}
            onClose={() => setSelectedNoteId(null)}
            onEdit={() => dispatch(startEditingNote({ id: selectedNote.id }))}
            onDelete={() => handleDeleteClick(selectedNote.id)}
            onFavorite={() => dispatch(isFavorite({ id: selectedNote?.id }))}
            isFavorite={selectedNote?.isFavorite}
          />
        </div>
  )
}

export default Notes
