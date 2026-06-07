import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';

import { getDashboardData } from '@/services/dashboardApi';

const Navbar = () => {
  const location = useLocation();

  const pageName = location.pathname.replace("/","").charAt(0).toUpperCase() + location.pathname.replace("/","").slice(1);

  const [stats,setStats] = useState({
    dueToday:0, currentStreak: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try{
        const data=await getDashboardData();

        setStats(data.stats);
      }catch(error){
        console.error(error);
      }
    };
    fetchStats();
  },[]);

  return (


    <header className="h-[72px] bg-white border-b border-[#e8e4de] flex items-center justify-between px-8">
      <h2 className="text-2xl font-semibold text-[#2c2c2c]">
        {pageName}
      </h2>

      <div className="flex items-center gap-4">
        <div className="px-4 py-2 rounded-full bg-green-100 text-[#10b981] text-sm font-medium">
          {stats.dueToday} Due Today
        </div>

        <div className="px-4 py-2 rounded-full bg-[#f4e8e2] text-[#d97757] text-sm font-medium">
          {stats.currentStreak} Day Streak
        </div>
      </div>
    </header>
  )
}

export default Navbar
