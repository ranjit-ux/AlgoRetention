import { Link } from "react-scroll";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;

    setDarkMode(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50
    grid grid-cols-3 items-center
    px-[6vw] h-[68px]
    transition-all duration-300 backdrop-blur-xl border-b
    bg-background/80 border-border
    ${scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.06)]" : ""}`}
    >
      {/* Brand */}
      <div className="justify-self-start">
        <span className="font-serif italic text-[1.35rem] text-[#D97757] tracking-tight">
          AlgoRetention
        </span>
      </div>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-8 justify-self-center">
        {["how", "features", "pricing", "faq"].map((id) => (
          <Link
            key={id}
            to={id}
            smooth
            offset={-68}
            className="text-[13px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer capitalize"
          >
            {id === "how"
              ? "How it works"
              : id.charAt(0).toUpperCase() + id.slice(1)}
          </Link>
        ))}
      </nav>

      <div className="justify-self-end">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
