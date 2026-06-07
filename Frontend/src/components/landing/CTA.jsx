const CTA = () => (
  <div className="bg-[#F8F4EF] py-16 px-[6vw]">
    <div
      className="bg-[#1A1714] rounded-[28px] px-[6vw] py-20 text-center relative overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      <div
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(217,119,87,0.18) 0%,transparent 70%)", zIndex: 0 }}
      />
      <div className="relative z-10">
        <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] text-white leading-[1.1] mb-3">
          Your next interview<br />is <em className="italic text-[#F3C4AE]">closer than you think.</em>
        </h2>
        <p className="text-[.95rem] text-white/40 mb-8 font-light">
          Stop forgetting what you worked hard to solve. Start building real retention today.
        </p>
        <button className="bg-[#D97757] text-white border-none rounded-xl px-8 py-4 text-[15px] font-medium hover:bg-[#C4623F] transition-all shadow-[0_4px_16px_rgba(217,119,87,0.35)]">
          Get started free — takes 30 seconds
        </button>
      </div>
    </div>
  </div>
);

export default CTA;