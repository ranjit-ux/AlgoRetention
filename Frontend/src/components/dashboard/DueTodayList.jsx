import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const diffColor = {
  Easy: { bg: "#E4F5EF", text: "#085041" },
  Medium: { bg: "#FDF1EB", text: "#712B13" },
  Hard: { bg: "#FCEBEB", text: "#791F1F" },
};

const DueTodayList = ({ problems = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-[#E4DDD5] rounded-[20px] p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[13px] font-semibold text-[#1A1714]">Due today</div>
          <div className="text-[11px] text-[#A89E95] mt-0.5">{problems.length} to review</div>
        </div>
        {problems.length > 0 && (
          <button
            onClick={() => navigate("/revisions")}
            className="flex items-center gap-1 text-[12px] font-medium text-[#D97757] hover:text-[#C4623F] transition-colors"
          >
            Start all <ArrowRight size={13} />
          </button>
        )}
      </div>

      {problems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <CheckCircle2 size={32} className="text-[#1A9970] mb-2 opacity-60" />
          <div className="text-[13px] font-medium text-[#1A1714]">All caught up!</div>
          <div className="text-[12px] text-[#A89E95] mt-1">Next revision due tomorrow.</div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {problems.slice(0, 5).map((p) => {
            const dc = diffColor[p.difficulty] || diffColor.Medium;
            return (
              <div
                key={p._id}
                onClick={() => navigate(`/revisions`)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] hover:bg-[#F8F4EF] transition-colors cursor-pointer group"
              >
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-[6px] flex-shrink-0"
                  style={{ background: dc.bg, color: dc.text }}
                >
                  {p.difficulty}
                </span>
                <span className="text-[13px] text-[#1A1714] flex-1 truncate font-medium">
                  {p.title}
                </span>
                <span className="text-[11px] text-[#A89E95] flex-shrink-0 group-hover:text-[#D97757] transition-colors">
                  Review →
                </span>
              </div>
            );
          })}
          {problems.length > 5 && (
            <button
              onClick={() => navigate("/revisions")}
              className="text-[12px] text-[#A89E95] hover:text-[#D97757] transition-colors mt-1 text-center"
            >
              +{problems.length - 5} more
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DueTodayList;