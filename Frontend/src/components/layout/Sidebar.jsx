import React from 'react'
import { LayoutDashboard, BookOpen,RefreshCw, BarChart3, Settings, LogOut } from 'lucide-react'

import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext';
const Sidebar = () => {
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Problems",
      path: "/problems",
      icon: BookOpen,
    },
    {
      name: "Revisions",
      path: "/revisions",
      icon: RefreshCw,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name:"Support",
      path:"/support",
      icon: Settings,
    },
  ];

  const navigate = useNavigate();
  const {logout} = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/");
  }

  return(
    <aside className="w-[260px] bg-white border-r border-[#e8e4de] flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#d97757]">
          AlgoRetention
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Remember What You Solve
        </p>
      </div>

      <nav className="flex-1 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return(
            <NavLink
              key={item.path}
              to={item.path}
              className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition ${isActive ? "bg-[#f4e8e2] text-[#d97757]" : "text-gray-600 hover:bg-gray-100"} `}
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#e8e4de]">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 hover:scale-110 transition cursor-pointer">
          <LogOut size={18} />
        </button>
      </div>

    </aside>
  );
};

export default Sidebar
