import { useState } from "react";

const faqs = [
  { q: "How is this different from keeping a spreadsheet?", a: "A spreadsheet is passive you decide when to review. SM-2 calculates the mathematically optimal interval after each review. It's the difference between guessing and knowing exactly when memory fades." },
  { q: "How long does the daily review take?", a: "Most users spend 15–25 minutes. The algorithm only surfaces what you're about to forget not everything at once. The stronger your recall, the longer reviews get pushed out." },
  { q: "Do I need to be on LeetCode?", a: "No. AlgoRetention is platform-agnostic. Log problems from LeetCode, Codeforces, HackerRank — anywhere. Just add the name, link, and your notes." },
  { q: "What does the retention score actually measure?", a: "It estimates how much of your problem library you could reproduce right now under exam conditions accounting for time since last review and your historical recall ratings." },
  { q: "Will this help for OA rounds, not just interviews?", a: "Yes. Consistent pattern recognition from spaced repetition directly improves OA speed and accuracy. Patterns you've internalized fire instantly you're not reconstructing them from scratch." },
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