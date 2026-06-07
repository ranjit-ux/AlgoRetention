import { Link } from "react-scroll";
import { useEffect, useState } from "react";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[6vw] h-[68px] transition-shadow duration-300
        bg-[#F8F4EF]/80 backdrop-blur-xl border-b border-[#E4DDD5]/70
        ${scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.06)]" : ""}`}
    >
      {/* Brand */}
      <div className="flex items-baseline gap-0">
        <span className="font-serif italic text-[1.35rem] text-[#D97757] tracking-tight">
          AlgoRetention
        </span>
      </div>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-8">
        {["how", "features", "pricing", "faq"].map((id) => (
          <Link
            key={id}
            to={id}
            smooth
            offset={-68}
            className="text-[13px] text-[#7A736A] hover:text-[#1A1714] transition-colors cursor-pointer capitalize"
          >
            {id === "how" ? "How it works" : id.charAt(0).toUpperCase() + id.slice(1)}
          </Link>
        ))}
      </nav>

      {/* Actions */}
      {/* <div className="flex items-center gap-2.5">
        <button className="border border-[#E4DDD5] rounded-[10px] px-4 py-2 text-[13px] text-[#7A736A] hover:border-[#D97757] hover:text-[#D97757] transition-all bg-transparent">
          Sign in
        </button>
        <Link
          to="hero"
          smooth
          className="bg-[#1A1714] text-white rounded-[10px] px-4 py-2 text-[13px] font-medium hover:bg-[#D97757] transition-colors cursor-pointer"
        >
          Get started free
        </Link>
      </div> */}
    </header>
  );
};

export default Navbar;