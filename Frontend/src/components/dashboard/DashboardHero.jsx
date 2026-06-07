import { useEffect, useState } from "react";

const DashboardHero = ({ stats }) => {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const emoji = hour < 12 ? "☀️" : hour < 17 ? "🌤️" : "🌙";

  // Motivational sub-line based on due count
  const dueToday = stats?.dueToday ?? 0;
  const subLine =
    dueToday === 0
      ? "All caught up! Great job staying consistent."
      : `You have ${dueToday} revision${dueToday > 1 ? "s" : ""} due — let's knock them out.`;

  return (
    <section className="relative bg-white border border-[#E4DDD5] rounded-[24px] p-8 mb-6 overflow-hidden">
      {/* Subtle glow */}
      <div
        className="absolute top-[-40px] right-[-40px] w-[220px] h-[220px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,rgba(217,119,87,0.1) 0%,transparent 70%)",
        }}
      />

      <div className="relative">
        <p className="text-[12px] font-medium text-[#A89E95] tracking-[0.05em] uppercase mb-2">
          Welcome back
        </p>
        <h1 className="font-serif italic text-[2.4rem] leading-[1.1] text-[#1A1714] mb-2">
          {greeting} {emoji}
        </h1>
        <p className="text-[14px] text-[#7A736A] font-light">{subLine}</p>
      </div>
    </section>
  );
};

export default DashboardHero;