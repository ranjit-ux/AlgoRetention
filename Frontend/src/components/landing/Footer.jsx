import {FiMail} from "react-icons/fi"
import {FaGithub} from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-[#1A1714] border-t border-white/[0.07] px-[6vw] pt-12 pb-7">
    <div className="flex justify-between flex-wrap gap-10 mb-12">
      <div>
        <div className="font-serif italic text-[1.2rem] text-[#F3C4AE]">AlgoRetention</div>
        <p className="text-[12px] text-white/30 mt-1.5 max-w-[200px] leading-[1.6]">
          Spaced repetition for competitive programmers. Built by a developer, for developers.
        </p>
        <div className="flex gap-2.5 mt-3">
          {[
            { icon: FaGithub, href: "https://github.com/ranjit-ux" },
            { icon: FaLinkedin, href: "https://www.linkedin.com/in/ranjit-kumar-singh/" },
            { icon: FiMail, href: "mailto:ranjitksingh.079@gmail.com" },
          ].map(({ icon: Icon, href }) => (
            <a key={href} href={href} target="_blank" rel="noreferrer"
              className="w-[34px] h-[34px] rounded-[9px] border border-white/10 flex items-center justify-center text-white/40 hover:border-[#F3C4AE] hover:text-[#F3C4AE] transition-all"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>

      <div className="flex gap-16 flex-wrap">
        {[
          { heading: "Product", links: [["How it works","#how"],["Features","#features"],["Pricing","#pricing"],["FAQ","#faq"]] },
          { heading: "Developer", links: [["GitHub","https://github.com/ranjit-ux"],["LinkedIn","https://www.linkedin.com/in/ranjit-kumar-singh/"],["Email","mailto:ranjitksingh.079@gmail.com"]] },
          { heading: "App", links: [["Dashboard","/dashboard"],["Problems","/problems"],["Revisions","/revisions"],["Analytics","/analytics"]] },
        ].map(({ heading, links }) => (
          <div key={heading}>
            <h4 className="text-[10.5px] font-semibold tracking-[.08em] uppercase text-white/25 mb-3">{heading}</h4>
            {links.map(([label, href]) => (
              <a key={label} href={href} className="block text-[13px] text-white/45 mb-2 hover:text-[#F3C4AE] transition-colors">
                {label}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>

    <div className="border-t border-white/[0.07] pt-5 flex justify-between flex-wrap gap-2">
      <p className="text-[11.5px] text-white/20">© 2026 AlgoRetention · Built by Ranjit Kumar Singh</p>
      <p className="text-[11.5px] text-white/20">Open source</p>
    </div>
  </footer>
);

export default Footer;