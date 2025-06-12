import React from 'react'
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

function Card() {
  return (
    <>

    <div class="relative w-64 h-64 bg-bluebg dark:bg-bluebg rounded-lg shadow-lg overflow-hidden group">
  {/* <!-- Folded Corner --> */}
  {/* <div class="absolute top-0 right-0 w-10 h-10 bg-yellow-300 clip-corner z-10"></div> */}



  {/* <!-- Card Content --> */}
  <div class="p-4 flex flex-col justify-between h-full z-0 relative">
    <div class="flex justify-between items-center mb-4 gap-2">
      <h3 class="font-bold text-lg truncate">Sticky Note Title Sticky Note Title</h3>
      <button class="opacity-0 group-hover:opacity-100 group-hover:text-secondarytext">
      <StarRateOutlinedIcon fontSize="small"/>
    </button>
    </div>
    <p class="text-sm text-gray-800 overflow-hidden overflow-ellipsis line-clamp-6">
      This is a sticky note. The content should be trimmed to show ellipsis if too long for the container.This is a sticky note. The content should be trimmed to show ellipsis if too long for the container. The content should be trimmed to show ellipsis if too long for the container.
    </p>

    {/* <!-- Footer --> */}
    <div class="flex justify-between items-center mt-4 pt-4 text-xs text-gray-600">
      <span>10 June 2025, 3:45 PM</span>
      <div class="space-x-2">
        <button class="opacity-0 group-hover:opacity-100 group-hover:text-zinc-600 "><CreateOutlinedIcon fontSize="small"/></button>
        <button class="opacity-0 group-hover:opacity-100 group-hover:text-zinc-600 "><DeleteOutlineOutlinedIcon fontSize="small"/></button>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Card
