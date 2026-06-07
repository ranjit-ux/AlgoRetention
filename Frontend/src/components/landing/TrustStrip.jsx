const items = [
  "SM-2 Algorithm",
  "Open Source",
  "Interview Focused",
  "Free Forever Plan",
  "Auto Company Tags",
  "Built for DSA",
];

const TrustStrip = () => (
  <div className="bg-white border-t border-b border-[#EDE7DF] py-7 px-[6vw] flex items-center justify-center flex-wrap gap-x-9 gap-y-3">
    {items.map((item, i) => (
      <div key={item} className="flex items-center gap-2.5">
        {i !== 0 && <span className="w-1 h-1 rounded-full bg-[#E4DDD5]" />}
        <span className="text-[12px] font-medium text-[#C5BFB8] tracking-[0.05em] uppercase">
          {item}
        </span>
      </div>
    ))}
  </div>
);

export default TrustStrip;