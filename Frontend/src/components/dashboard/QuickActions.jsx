import { useNavigate } from "react-router-dom";
import { Plus, RefreshCw, BarChart2 } from "lucide-react";

const actions = [
  {
    icon: Plus,
    label: "Log a problem",
    desc: "Add a newly solved problem",
    path: "/problems",
  },
  {
    icon: RefreshCw,
    label: "Start revision",
    desc: "Review today's due problems",
    path: "/revisions",
  },
  {
    icon: BarChart2,
    label: "View analytics",
    desc: "Topic & difficulty breakdown",
    path: "/analytics",
  },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-[#E4DDD5] rounded-[20px] p-5 mb-4">
      <div className="text-[13px] font-semibold text-[#1A1714] mb-4">Quick actions</div>
      <div className="flex flex-col gap-2">
        {actions.map(({ icon: Icon, label, desc, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] border border-[#E4DDD5] hover:border-[#F3C4AE] hover:bg-[#FDF1EB] transition-all group text-left"
          >
            <div className="w-8 h-8 rounded-[9px] bg-[#FDF1EB] border border-[#F3C4AE] flex items-center justify-center flex-shrink-0 group-hover:bg-[#F3C4AE] transition-colors">
              <Icon size={14} color="#D97757" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-semibold text-[#1A1714]">{label}</div>
              <div className="text-[11px] text-[#A89E95]">{desc}</div>
            </div>
            <span className="text-[12px] text-[#C5BFB8] group-hover:text-[#D97757] transition-colors">→</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;