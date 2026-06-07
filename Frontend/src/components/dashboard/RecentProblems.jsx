import { useNavigate } from "react-router-dom";

const diffColor = {
  Easy: { bg: "#E4F5EF", text: "#085041" },
  Medium: { bg: "#FDF1EB", text: "#712B13" },
  Hard: { bg: "#FCEBEB", text: "#791F1F" },
};

const daysUntil = (dateStr) => {
  if (!dateStr) return null;
  const diff = Math.ceil((new Date(dateStr) - new Date()) / 86400000);
  if (diff <= 0) return "Due";
  if (diff === 1) return "1d";
  return `${diff}d`;
};

const RecentProblems = ({ problems = [] }) => {
  const navigate = useNavigate();

  const display = problems.slice(0, 5);

  // Fallback
  const demo = [
    { _id: "1", title: "Two Sum", difficulty: "Easy", nextReview: null },
    { _id: "2", title: "Binary Tree Level Order", difficulty: "Medium", nextReview: new Date(Date.now() + 5 * 86400000) },
    { _id: "3", title: "Coin Change", difficulty: "Medium", nextReview: new Date(Date.now() + 7 * 86400000) },
    { _id: "4", title: "Merge Intervals", difficulty: "Medium", nextReview: new Date(Date.now() + 3 * 86400000) },
  ];

  const rows = display.length > 0 ? display : demo;

  return (
    <div className="bg-white border border-[#E4DDD5] rounded-[20px] p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-[13px] font-semibold text-[#1A1714]">Recent problems</div>
        <button
          onClick={() => navigate("/problems")}
          className="text-[11.5px] text-[#A89E95] hover:text-[#D97757] transition-colors"
        >
          View all →
        </button>
      </div>

      <div className="flex flex-col">
        {rows.map((p, i) => {
          const dc = diffColor[p.difficulty] || diffColor.Medium;
          const due = daysUntil(p.nextRevisionDate);
          return (
            <div
              key={p._id}
              className={`flex items-center gap-3 py-2.5 cursor-pointer hover:bg-[#F8F4EF] rounded-[10px] px-2 -mx-2 transition-colors ${
                i < rows.length - 1 ? "border-b border-[#F2EDE5]" : ""
              }`}
              onClick={() => navigate("/problems")}
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
              {due && (
                <span
                  className="text-[10.5px] flex-shrink-0 font-medium px-2 py-0.5 rounded-[6px]"
                  style={{
                    background: due === "Due" ? "#FDF1EB" : "#F2EDE5",
                    color: due === "Due" ? "#D97757" : "#A89E95",
                  }}
                >
                  {due === "Due" ? "Due now" : `In ${due}`}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentProblems;