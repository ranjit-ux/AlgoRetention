const COLORS = [
  "#D97757",
  "#1A9970",
  "#4F6BB2",
  "#C4623F",
  "#8FA3B8",
  "#A89E95",
];

const TopicBreakdown = ({ problems = [] }) => {
  const topicMap = {};

  problems.forEach((problem) => {
    if (!problem.topic) return;

    const topic = problem.topic.trim();

    topicMap[topic] = (topicMap[topic] || 0) + 1;
  });

  const totalProblems = problems.length;

  const topics = Object.entries(topicMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return (
    <div className="bg-white border border-[#E4DDD5] rounded-[20px] p-5">
      <div className="text-[13px] font-semibold text-[#1A1714] mb-0.5">
        Topics Solved
      </div>

      <div className="text-[11px] text-[#A89E95] mb-4">
        {totalProblems} problems logged
      </div>

      {topics.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-[13px] font-medium text-[#1A1714]">
            No topics yet
          </p>

          <p className="text-[11px] text-[#A89E95] mt-1">
            Solve and log problems to see topic distribution
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {topics.map(([topic, count], index) => {
            const percentage = Math.round(
              (count / totalProblems) * 100
            );

            return (
              <div key={topic}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-medium text-[#1A1714] truncate">
                    {topic}
                  </span>

                  <span className="text-[11px] text-[#A89E95] flex-shrink-0 ml-2">
                    {count} · {percentage}%
                  </span>
                </div>

                <div className="w-full h-[6px] bg-[#F2EDE5] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${percentage}%`,
                      background:
                        COLORS[index % COLORS.length],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopicBreakdown;