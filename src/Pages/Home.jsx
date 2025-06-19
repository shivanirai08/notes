import React from 'react'
import Navbar from '../Compoments/Navbar'
import Card from '../Compoments/Card'
import Topbar from '../Compoments/Topbar'
import { useSelector } from 'react-redux'

function Home() {
  const notes = useSelector((state) => state.notes.notes);

  return (
    <div className=' relative flex h-screen w-full'>
      <Navbar />
      <div className=' bg-zinc-50 dark:bg-zinc-900  w-full'>
          <Topbar />
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
          {notes.map((note) => (
            <Card key={note.id} title={note.title} content={note.content} date={note.date} color={note.color} />
          ))}
        </div>
        </div>
    </div>
  )
}

export default Home
