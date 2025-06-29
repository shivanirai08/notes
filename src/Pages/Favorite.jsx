import React from 'react'
import Navbar from '../Compoments/Navbar'
import Topbar from '../Compoments/Topbar'
import Card from '../Compoments/Card'
import Opennote from './Opennote'
import { useSelector, useDispatch } from 'react-redux'
import { isFavorite } from '../redux/noteSlice'

function Favorite() {
  const notes = useSelector((state) => state.notes.notes)
  const dispatch = useDispatch()
  const [selectedNoteId, setSelectedNoteId] = React.useState(null)
  const favoriteNotes = notes.filter(n => n.isFavorite)
  const selectedNote = notes.find(n => n.id === selectedNoteId)

  return (
    <div className='relative flex h-screen w-full'>
      <Navbar />
      <div className='bg-zinc-50 dark:bg-zinc-900 w-full'>
        <Topbar />
        <div className="flex flex-wrap gap-6 p-4" style={{ alignItems: 'flex-start' }}>
          {favoriteNotes.map((note) => (
            <div key={note.id} style={{ flex: '0 1 250px', maxWidth: '100%' }} onClick={() => setSelectedNoteId(note.id)} className="cursor-pointer">
              <Card
                title={note.title}
                content={note.content}
                date={note.date}
                color={note.color}
                onDelete={() => console.log('Delete note')}
                onEdit={() => console.log('Edit note')}
                onFavorite={() => dispatch(isFavorite({ id: note.id }))}
                isFavorite={note.isFavorite}
              />
            </div>
          ))}
          {selectedNote && (
            <Opennote
              note={selectedNote}
              onClose={() => setSelectedNoteId(null)}
              onEdit={() => console.log('Edit note')}
              onDelete={() => console.log('Delete note')}
              onFavorite={() => dispatch(isFavorite({ id: selectedNote.id }))}
              isFavorite={selectedNote.isFavorite}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Favorite
