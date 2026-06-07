import { useEffect, useState } from "react";
import { getDashboardData } from "@/services/dashboardApi";

import DashboardHero from "@/components/dashboard/DashboardHero";
import StatsCards from "@/components/dashboard/StatsCards";
import DueTodayList from "@/components/dashboard/DueTodayList";
import RecentProblems from "@/components/dashboard/RecentProblems";
import TopicBreakdown from "@/components/dashboard/TopicBreakdown";
import QuickActions from "@/components/dashboard/QuickActions";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [dueProblems, setDueProblems] = useState([]);
  const [recentProblems, setRecentProblems] = useState([]);
  const [retentionHistory, setRetentionHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getDashboardData();
        setStats(data.stats ?? null);
        setDueProblems(data.dueProblems ?? []);
        setRecentProblems(data.recentProblems ?? []);
        setRetentionHistory(data.retentionHistory ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#E4DDD5] border-t-[#D97757] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Hero */}
      <DashboardHero stats={stats} />

      {/* Stat cards */}
      <StatsCards stats={stats} />

      {/* 2-column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4">

        {/* Left column */}
        <div>
          {/* <RetentionChart data={retentionHistory} /> */}
          <RecentProblems problems={recentProblems} />
          <TopicBreakdown problems={recentProblems} />
        </div>

        {/* Right sidebar */}
        <div>
          <DueTodayList problems={dueProblems} />
          <QuickActions />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;