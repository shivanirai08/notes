import React from 'react'
import Navbar from '../Compoments/Navbar'
import Card from '../Compoments/Card'
import Topbar from '../Compoments/Topbar'
import { useSelector } from 'react-redux'

function Home() {
  const notes = useSelector((state) => state.notes.notes);

  return (
    <div className='relative flex h-screen w-full'>
      <Navbar />
      <div className='bg-zinc-50 dark:bg-zinc-900 w-full'>
        <Topbar />
        <div className="flex flex-wrap gap-6 p-4" style={{ alignItems: 'flex-start' }}>
          {notes.map((note) => (
            <div key={note.id} style={{ flex: '0 1 250px', maxWidth: '100%' }}>
              <Card title={note.title} content={note.content} date={note.date} color={note.color} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
