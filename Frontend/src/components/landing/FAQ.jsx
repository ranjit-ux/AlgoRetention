import { useState } from "react";

const faqs = [
  { q: "How is this different from keeping a spreadsheet?", a: "A spreadsheet is passive, you decide when to review, and that decision is usually a guess. AlgoRetention uses the SM-2 spaced repetition algorithm to calculate the mathematically optimal moment to revisit each problem, right before you'd forget it. It's the difference between guessing and knowing." },
  { q: "How long does the daily review take?", a: "Most users spend 15–25 minutes a day. The algorithm only surfaces problems you're close to forgetting, not your entire library at once. As your recall on a topic strengthens, those reviews get pushed further out automatically." },
  { q: "Do I need to be on LeetCode?", a: "Not at all. AlgoRetention is platform-agnostic log problems from LeetCode, Codeforces, HackerRank, GeeksforGeeks, or anywhere else. Just add the name, a link, and your notes, and it's part of your review cycle." },
  { q: "What does the retention score actually measure?", a: "It estimates how much of your problem library you could reproduce right now under OA or interview conditions accounting for time since last review and your historical recall ratings." },
  { q: "Will this help for OA rounds, or just interviews?", a: "Both. Consistent pattern recognition from spaced repetition directly improves OA speed and accuracy. Patterns you've internalized fire instantly you're not reconstructing them from scratch." },
  { q: "Is AlgoRetention free?", a: "Yes all core features are free right now with no credit card required. A Pro plan with some more features  is coming soon." },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="py-24 bg-background px-[6vw]">
      <div className="grid md:grid-cols-[1fr_2fr] gap-24">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#D97757] mb-3">
            <span className="w-[18px] h-[1.5px] bg-[#D97757] rounded" />
            FAQ
          </div>
          <h2 className="font-serif text-[2rem] leading-[1.08] mb-3">
            Got <em className="italic text-[#D97757]">questions?</em>
          </h2>
          <p className="text-[13.5px] text-[#7A736A] leading-[1.75] font-light">
            Everything you need to know. Can't find the answer? Reach out on GitHub or email.
          </p>
        </div>

        {/* Right */}
        <div>
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between text-left py-5 bg-transparent border-none font-sans text-[.875rem] font-medium text-foreground hover:text-[#D97757] transition-colors gap-4"
              >
                <span>{faq.q}</span>
                <span
                  className={`w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0 text-[12px] border transition-all duration-200
                    ${open === i
                      ? "rotate-180 bg-[#FDF1EB] border-[#F3C4AE] text-[#D97757]"
                      : "bg-[#F2EDE5] border-border text-[#7A736A]"
                    }`}
                >
                  ▾
                </span>
              </button>
              <div
                className={`text-[13px] text-[#7A736A] leading-[1.75] overflow-hidden transition-all duration-300 ${open === i ? "max-h-40 pb-4" : "max-h-0"}`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;