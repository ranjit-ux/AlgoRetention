import { Brain, Flame, CheckCircle, Clock } from "lucide-react";

const cards = [
  {
    title: "Problems Solved",
    key: "totalProblems",
    icon: CheckCircle,
    iconBg: "#E4F5EF",
    iconColor: "#1A9970",
    format: (v) => v,
    sub: (v) => (v > 0 ? `+${Math.min(v, 2)} this week` : "Start logging!"),
    subColor: "#1A9970",
  },
  {
    title: "Retention Score",
    key: "retentionScore",
    icon: Brain,
    iconBg: "#EEF2FF",
    iconColor: "#4F6BB2",
    format: (v) => `${v}%`,
    sub: (v) => (v >= 80 ? "Strong memory" : v >= 50 ? "Keep reviewing" : "Needs attention"),
    subColor: (v) => (v >= 80 ? "#1A9970" : v >= 50 ? "#D97757" : "#DC2626"),
  },
  {
    title: "Current Streak",
    key: "currentStreak",
    icon: Flame,
    iconBg: "#FDF1EB",
    iconColor: "#D97757",
    format: (v) => v,
    sub: (v) => (v >= 3 ? "Keep it up! 🔥" : "Build the habit"),
    subColor: "#D97757",
  },
  {
    title: "Due Today",
    key: "dueToday",
    icon: Clock,
    iconBg: (v) => (v === 0 ? "#E4F5EF" : "#FDF1EB"),
    iconColor: (v) => (v === 0 ? "#1A9970" : "#D97757"),
    format: (v) => v,
    sub: (v) => (v === 0 ? "All caught up ✓" : `${v} pending`),
    subColor: (v) => (v === 0 ? "#1A9970" : "#D97757"),
  },
];

const StatsCards = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
    {cards.map((card) => {
      const Icon = card.icon;
      const raw = stats?.[card.key] ?? 0;
      const val = card.format(raw);
      const sub = typeof card.sub === "function" ? card.sub(raw) : card.sub;
      const subColor = typeof card.subColor === "function" ? card.subColor(raw) : card.subColor;
      const iconBg = typeof card.iconBg === "function" ? card.iconBg(raw) : card.iconBg;
      const iconColor = typeof card.iconColor === "function" ? card.iconColor(raw) : card.iconColor;

      return (
        <div
          key={card.title}
          className="bg-white border border-[#E4DDD5] rounded-[20px] p-5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-medium text-[#7A736A]">{card.title}</span>
            <div
              className="w-8 h-8 rounded-[9px] flex items-center justify-center"
              style={{ background: iconBg }}
            >
              <Icon size={15} color={iconColor} />
            </div>
          </div>
          <div className="font-serif italic text-[2.2rem] leading-none text-[#1A1714] mb-1.5">
            {val}
          </div>
          <div className="text-[11.5px] font-medium" style={{ color: subColor }}>
            {sub}
          </div>
        </div>
      );
    })}
  </div>
);

export default StatsCards;