import React from 'react'
import { useState } from 'react';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

function Navbar() {

  const [active, setActive] = useState('Dashboard');
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardOutlinedIcon />, activeicon: <DashboardIcon /> },
    { label: 'Favourites', icon: <StarBorderOutlinedIcon />, activeicon: <StarIcon />},
    { label: 'Archived', icon: <ArchiveOutlinedIcon />, activeicon: <ArchiveIcon /> },
    { label: 'Bin', icon: <DeleteOutlineOutlinedIcon />, activeicon: <DeleteIcon /> },
  ];

  return (
    <div className={`h-screen ${collapsed ? 'w-20' : 'w-48'} flex flex-col items-start bg-gray-100 p-4 transition-all duration-500 sticky left-0 top-0 shadow-md`}>
      {!collapsed && <img src='/assets/logo1.svg' alt='logo' className='h-12 bg-blue mb-12 ml-2'/>}
      {collapsed && <img src='/assets/logo-2.svg' alt='logo' className='h-12 bg-blue mb-12 ml-2'/>}
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => setActive(item.label)}
            className={`flex gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-blue-100 transition-all ${
              active === item.label ? 'bg-blue-200 text-blue-500' : 'text-slate-800'
            }`}
          >
            {active === item.label ? item.activeicon : item.icon}
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </div>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 flex items-center gap-2 cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
        {!collapsed && <KeyboardDoubleArrowLeftOutlinedIcon className="text-black" />}
        {collapsed && <KeyboardDoubleArrowLeftOutlinedIcon className="text-black rotate-180" />}
        {!collapsed && <span className="text-sm font-medium">Collapse menu</span>}
      </div>
    </div>
  )
}

export default Navbar
