import React from 'react'
import Card from '../Compoments/Card'
import Opennote from './Opennote'
import { useSelector, useDispatch } from 'react-redux'
import { startEditingNote, isFavorite } from '../redux/noteSlice'
import { useState } from 'react'
import DeleteModal from './DeleteModal'
import { deleteNote } from '../redux/noteSlice'
import { toast } from 'react-toastify'
import { useTheme } from '../ThemeContext'



const Notes = ({type}) => {
  const { darkMode } = useTheme();
  const isDarkMode = darkMode;
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes.notes);
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const selectedNote = notes.find((n) => n.id === selectedNoteId);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const searchText = useSelector((state) => state.notes.searchText);

    var filteredNotes =
  !searchText || searchText.trim() === ""
    ? notes
    : notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchText.toLowerCase()) ||
          note.content.toLowerCase().includes(searchText.toLowerCase())
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

           {filteredNotes.length === 0 && (
  <div className="w-full flex flex-col items-center justify-center mt-16">
    {(!searchText || searchText.trim() === "") && type === "all" && (
      <>
        <img
          src={isDarkMode ? "/assets/notes_dark.svg" : "/assets/notes.svg"}
          alt="Empty Notes"
          className="w-40 h-40 lg:w-52 lg:h-52 mb-4"
        />
        <h2 className="text-xl font-semibold mb-2 dark:text-white">No Notes Found</h2>
        <p className="text-gray-500 text-center dark:text-gray-400">You haven’t added any notes yet.</p>
      </>
    )}

    {(!searchText || searchText.trim() === "") && type === "favorite" && (
      <>
        <img
          src={isDarkMode ? "/assets/favourite_dark.svg" : "/assets/favourite.svg"}
          alt="No Favorites"
          className="w-40 h-40 lg:w-52 lg:h-52 mb-4"
        />
        <h2 className="text-xl font-semibold mb-2 dark:text-white">No Favorite Notes</h2>
        <p className="text-gray-500 text-center dark:text-gray-400">You haven’t marked any note as favorite.</p>
      </>
    )}

    {searchText && searchText.trim() !== "" && (
      <>
        <img
          src={isDarkMode ? "/assets/result_dark.svg" : "/assets/result.svg"}
          alt="No Search Results"
          className="w-40 h-40 lg:w-52 lg:h-52 mb-4"
        />
        <h2 className="text-xl font-semibold mb-2 dark:text-white">No Results</h2>
        <p className="text-gray-500 text-center dark:text-gray-400">
          No notes match your search for "<span className="font-medium">{searchText}</span>"
        </p>
      </>
    )}
  </div>
)}



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
