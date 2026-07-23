import { useEffect, useRef } from "react";

const scheduleData = [
  { name: "Two Sum", width: "100%", days: "Today", highlight: true },
  { name: "Merge Intervals", width: "68%", days: "3d" },
  { name: "Coin Change", width: "48%", days: "7d" },
  { name: "LRU Cache", width: "28%", days: "14d" },
  { name: "Word Ladder", width: "13%", days: "30d" },
];

const row1 = [
  { icon: "📅", title: "SM-2 Spaced Repetition", desc: "The algorithm proven over 30 years of cognitive science. After each review you rate recall Again, Hard, Good, or Easy and intervals adjust automatically." },
  { icon: "⚡", title: "Daily revision queue", desc: "Open the app, see exactly what to review today. No planning. No forgetting. The algorithm decides you just show up." },
  { icon: "🏷️", title: "Auto company tags", desc: "Company-to-problem mappings attached automatically. Know which problems Google, Amazon, or Uber ask without manual research." },
];

const row2 = [
  { icon: "📊", title: "GitHub-style activity heatmap (soon) ", desc: "See your entire review history at a glance. Dark squares mean you showed up. Watch the grid fill it's dangerously motivating." },
  { icon: "📈", title: "Retention score analytics", desc: "A live estimate of how much you could recall right now. Decays when you miss reviews, rises when you nail them." },
  { icon: "🗒️", title: "Rich personal notes", desc: "Store your approach, edge cases, and intuition. When you revisit, you're reviewing your own thinking not a stranger's editorial." },
];

const FeatItem = ({ icon, title, desc }) => (
  <div className="flex gap-4 items-start">
    <div className="w-10 h-10 rounded-[11px] bg-[#FDF1EB] border border-[#F3C4AE] flex items-center justify-center text-[18px] flex-shrink-0 mt-0.5">
      {icon}
    </div>
    <div>
      <h3 className="text-[.9rem] font-semibold mb-1">{title}</h3>
      <p className="text-[13px] text-[#7A736A] leading-[1.7]">{desc}</p>
    </div>
  </div>
);

const Features = () => {
  const hmapRef = useRef(null);

  useEffect(() => {
    const fw = [0,0,1,0,0,2,0,1,0,3,0,1,2,0,0,1,0,2,1,0,3,2,0,1,0,0,1,2,0,1,0,0,2,1,0,3,0,1,0,2,0,0,1,3,0,2,1,0,0,3];
    if (hmapRef.current) {
      for (let i = 0; i < 182; i++) {
        const c = document.createElement("div");
        const w = fw[i % fw.length];
        const bg = w === 1 ? "#F3C4AE" : w === 2 ? "#E8976C" : w === 3 ? "#D97757" : "#EAE4DA";
        c.style.cssText = `aspect-ratio:1;border-radius:2px;background:${bg}`;
        hmapRef.current.appendChild(c);
      }
    }
  }, []);

  return (
    <section id="features" className="py-24 bg-background px-[6vw]">
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#D97757] mb-3">
        <span className="w-[18px] h-[1.5px] bg-[#D97757] rounded" />
        Core features
      </div>
      <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.08] mb-14">
        Everything your memory <em className="italic text-[#D97757]">needs</em>
      </h2>

      {/* Row 1 */}
      <div className="grid md:grid-cols-2 gap-20 items-center mb-20">
        <div className="flex flex-col gap-8">
          {row1.map((f) => <FeatItem key={f.title} {...f} />)}
        </div>
        <div className="bg-white border border-[#E4DDD5] rounded-[20px] overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.055)]">
          <div className="p-6">
            <div className="text-[13px] font-semibold mb-4">Upcoming review schedule</div>
            {scheduleData.map((s) => (
              <div key={s.name} className="flex items-center gap-2.5 mb-2.5">
                <span className="text-[11.5px] text-[#7A736A] w-[90px] flex-shrink-0 font-medium">{s.name}</span>
                <div className="flex-1 bg-background rounded-full h-[7px] overflow-hidden">
                  <div className="h-full rounded-full bg-[#D97757]" style={{ width: s.width }} />
                </div>
                <span className={`text-[11px] w-9 text-right flex-shrink-0 ${s.highlight ? "text-[#D97757] font-semibold" : "text-[#7A736A]"}`}>
                  {s.days}
                </span>
              </div>
            ))}
            <div className="text-[11px] text-[#7A736A] mt-4 mb-2">Rate your recall for Two Sum:</div>
            <div className="flex gap-1.5">
              {[
                { label: "Again", cls: "bg-red-50 border-red-200 text-red-800" },
                { label: "Hard", cls: "bg-orange-50 border-orange-200 text-orange-900" },
                { label: "Good", cls: "bg-green-50 border-green-200 text-green-900" },
                { label: "Easy", cls: "bg-blue-50 border-blue-200 text-blue-900" },
              ].map((r) => (
                <button key={r.label} className={`flex-1 text-center py-2 rounded-[9px] text-[11px] font-semibold border hover:opacity-80 transition-opacity ${r.cls}`}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2 — reversed */}
      <div className="grid md:grid-cols-2 gap-20 items-center">
        <div className="bg-white border border-[#E4DDD5] rounded-[20px] overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.055)] order-2 md:order-1">
          <div className="p-6">
            <div className="text-[13px] font-semibold mb-3">Activity heatmap</div>
            <div className="flex gap-2 text-[9px] text-[#C5BFB8] mb-1">
              {["Jan","Feb","Mar","Apr"].map(m => <span key={m} className="flex-1">{m}</span>)}
            </div>
            <div
              ref={hmapRef}
              style={{ display:"grid", gridTemplateColumns:"repeat(26,1fr)", gap:"2px" }}
            />
            <div className="flex items-center gap-1.5 mt-2.5 text-[11px] text-[#7A736A]">
              Less
              {["#EAE4DA","#F3C4AE","#D97757","#A3462D"].map(c => (
                <span key={c} className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: c }} />
              ))}
              More
            </div>
            <div className="mt-3.5 pt-3 border-t border-[#EDE7DF] flex justify-between">
              <div>
                <div className="text-[12px] font-semibold">18-day streak 🔥</div>
                <div className="text-[11px] text-[#7A736A] mt-0.5">142 problems · 26 topics</div>
              </div>
              <div className="text-right">
                <div className="text-[12px] font-semibold text-[#D97757]">94% retention</div>
                <div className="text-[11px] text-[#7A736A] mt-0.5">Personal best</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 order-1 md:order-2">
          {row2.map((f) => <FeatItem key={f.title} {...f} />)}
        </div>
      </div>
    </section>
  );
};

export default Features;