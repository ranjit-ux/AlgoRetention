const bad = [
  "Solve once, forget in a week",
  "No revision schedule, it's all on you",
  "Re-solve the same problems over and over",
  "Weak pattern recall under interview pressure",
  "No visibility into what you actually know",
];

const good = [
  ["Solve once, ", "retain for months"],
  ["SM-2 ", "automatically schedules reviews"],
  ["Each review ", "reinforces the pattern deeper"],
  ["Pattern recognition becomes ", "instinct, not luck"],
  ["Live retention score shows ", "exactly where you stand"],
];

const Comparison = () => (
  <section id="comparison" className="py-24 bg-white px-[6vw]">
    <div className="text-center mb-14">
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#D97757] mb-3">
        <span className="w-[18px] h-[1.5px] bg-[#D97757] rounded" />
        Why AlgoRetention
      </div>
      <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.08] mb-3">
        Solving isn't <em className="italic text-[#D97757]">enough.</em>
      </h2>
      <p className="text-[.95rem] text-[#7A736A] font-light leading-[1.75] max-w-[460px] mx-auto">
        Most people lose 80% of what they solve within 7 days. Here's the difference.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {/* Bad */}
      <div className="rounded-[20px] border border-red-200 bg-red-50 p-10">
        <h3 className="text-[1.05rem] font-semibold mb-6">❌ Traditional workflow</h3>
        <div className="flex flex-col gap-3.5">
          {bad.map((item) => (
            <div key={item} className="flex items-start gap-2.5 text-[13.5px] text-[#7A736A]">
              <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[11px] flex-shrink-0 mt-0.5">
                ✕
              </div>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Good */}
      <div className="rounded-[20px] border border-green-200 bg-gradient-to-br from-green-50 to-[#FAFFF7] p-10">
        <h3 className="text-[1.05rem] font-semibold mb-6">✅ <em className="italic text-[#D97757]">AlgoRetention</em> workflow</h3>
        <div className="flex flex-col gap-3.5">
          {good.map(([plain, bold], i) => (
            <div key={i} className="flex items-start gap-2.5 text-[13.5px] text-[#7A736A]">
              <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[11px] flex-shrink-0 mt-0.5">
                ✓
              </div>
              {plain}<strong className="text-[#1A1714] font-semibold">{bold}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Comparison;