const freeFeats = ["Unlimited problems", "Full SM-2 scheduling", "Auto company tags", "Basic analytics"];
const proFeats = ["All free features", "Activity heatmap", "Full retention analytics","Company-wise sheets"];

const Pricing = () => (
  <section id="pricing" className="py-24 bg-background px-[6vw]">
    <div className="text-center mb-14">
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#D97757] mb-3">
        <span className="w-[18px] h-[1.5px] bg-[#D97757] rounded" />
        Simple pricing
      </div>
      <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.08] mb-3">
        Start free, <em className="italic text-[#D97757]">upgrade anytime</em>
      </h2>
      <p className="text-[.95rem] text-[#7A736A] font-light">No credit card. No lock-in. Everything is free right now.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-5 max-w-[680px] mx-auto">
      {/* Free */}
      <div className="bg-[#F2EDE5] border border-[#E4DDD5] rounded-[20px] p-8">
        <div className="text-[11px] font-semibold tracking-[.08em] uppercase text-[#7A736A] mb-3">Free</div>
        <div className="font-serif italic text-black text-[2.8rem] leading-none mb-1">₹0</div>
        <div className="text-[12px] text-[#7A736A] mb-6">forever · no card needed</div>
        {freeFeats.map((f) => (
          <div key={f} className="flex items-center gap-2 text-[13px] text-[#7A736A] mb-2.5">
            <span className="w-[17px] h-[17px] rounded-full bg-[#E4F5EF] text-[#1A9970] flex items-center justify-center text-[9px] flex-shrink-0">✓</span>
            {f}
          </div>
        ))}
        <button className="w-full mt-6 py-3 rounded-[11px] text-[13px] font-medium border border-[#E4DDD5] bg-white text-[#1A1714] hover:border-[#D97757] hover:bg-[#FDF1EB] hover:text-[#D97757] transition-all">
          Get started free
        </button>
      </div>

      {/* Pro */}
      <div className="bg-[#1A1714] border-transparent rounded-[20px] p-8 text-white">
        <div className="text-[11px] font-semibold tracking-[.08em] uppercase text-white/30 mb-3">Pro · Coming soon</div>
        <div className="font-serif italic text-[2.8rem] leading-none text-[#F3C4AE] mb-1">₹199</div>
        <div className="text-[12px] text-white/30 mb-6">per month</div>
        {proFeats.map((f) => (
          <div key={f} className="flex items-center gap-2 text-[13px] text-white/60 mb-2.5">
            <span className="w-[17px] h-[17px] rounded-full flex items-center justify-center text-[9px] flex-shrink-0" style={{ background:"rgba(217,119,87,0.2)", color:"#F3C4AE" }}>✓</span>
            {f}
          </div>
        ))}
        <button className="w-full mt-6 py-3 rounded-[11px] text-[13px] font-medium bg-[#D97757] text-white hover:bg-[#C4623F] transition-all">
          Join waitlist
        </button>
      </div>
    </div>
  </section>
);

export default Pricing;