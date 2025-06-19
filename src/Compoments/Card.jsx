import React from 'react'
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

function Card({title, content, date, color}) {
  return (
    <>
    <div className={`relative w-64 h-64 bg-${color} dark:bg-dark${color} rounded-lg shadow-lg dark:drop-shadow-lg overflow-hidden group`}>
    <div className="p-4 flex flex-col justify-between h-full z-0 relative">

    {/* Title */}
    <div className="flex justify-between items-center mb-4 gap-2">
      <h3 className="font-bold text-lg truncate">{title}</h3>
      <button className="opacity-0 group-hover:opacity-100 group-hover:text-secondarytext dark:group-hover:text-zinc-700">
      <StarRateOutlinedIcon fontSize="small"/>
    </button>
    </div>

    {/* Content */}
    <div className="text-sm text-gray-800 dark:text-gray-950 overflow-hidden overflow-ellipsis line-clamp-6">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>

    {/* Footer */}
    <div className="flex justify-between items-center mt-4 pt-4 text-xs text-gray-600 dark:text-gray-800">
      <span>{date}</span>
      <div className="space-x-2">
        <button className="opacity-0 group-hover:opacity-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-700"><CreateOutlinedIcon fontSize="small"/></button>
        <button className="opacity-0 group-hover:opacity-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-700"><DeleteOutlineOutlinedIcon fontSize="small"/></button>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Card
