const steps = [
  {
    num: "01",
    icon: "📝",
    title: "Solve a problem",
    desc: "Grind LeetCode. When you crack a problem, that's when AlgoRetention steps in.",
  },
  {
    num: "02",
    icon: "💾",
    title: "Log it with notes",
    desc: "Save your approach, intuition, complexities and edge cases in under 60 seconds. Your future self will thank you.",
  },
  {
    num: "03",
    icon: "🧠",
    title: "SM-2 schedules reviews",
    desc: "Our algorithm picks the exact day to surface each problem right before you'd forget it.",
  },
  {
    num: "04",
    icon: "🎯",
    title: "Ace the interview",
    desc: "Patterns become instinct. Walk in with genuine retention, not last-minute cramming.",
  },
];

const HowItWorks = () => (
  <section id="how" className="py-24 bg-background px-[6vw]">
    <div className="text-center mb-14">
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#D97757] mb-3">
        <span className="w-[18px] h-[1.5px] bg-[#D97757] rounded" />
        Simple process
      </div>

      <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.08] mb-3 text-foreground">
        Four steps to <em className="italic text-[#D97757]">never forgetting</em>
      </h2>

      <p className="text-[.95rem] text-muted-foreground font-light leading-[1.75] max-w-[480px] mx-auto">
        No spreadsheets. No guesswork. Start building real retention from day one.
      </p>
    </div>

    <div
      className="grid gap-[2px] rounded-[20px] overflow-hidden bg-border"
      style={{ gridTemplateColumns: "repeat(4,1fr)" }}
    >
      {steps.map((step, i) => (
        <div key={step.num} className="bg-card p-8 relative">
          <div className="font-serif italic text-[3rem] leading-none text-muted mb-3">
            {step.num}
          </div>

          <div className="w-[42px] h-[42px] rounded-[11px] bg-[#FDF1EB] border border-[#F3C4AE] flex items-center justify-center text-[20px] mb-4">
            {step.icon}
          </div>

          <h3 className="text-[.9rem] font-semibold mb-1.5 text-foreground">
            {step.title}
          </h3>

          <p className="text-[12.5px] text-muted-foreground leading-[1.7]">
            {step.desc}
          </p>

          {i < steps.length - 1 && (
            <div className="absolute top-1/2 -right-[10px] -translate-y-1/2 w-5 h-5 rounded-full bg-[#FDF1EB] border border-[#F3C4AE] flex items-center justify-center text-[11px] text-[#D97757] z-10">
              →
            </div>
          )}
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorks;