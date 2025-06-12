import React from 'react'
import Navbar from '../Compoments/Navbar'
import Card from '../Compoments/Card'

function Home() {
  return (
    <div className=' relative flex h-screen w-full'>
      <Navbar />
      <div className='p-4 bg-zinc-50 w-full'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          <Card title="Note 1" content="This is the content of note 1." />
        </div>
        </div>
    </div>
  )
}

export default Home
