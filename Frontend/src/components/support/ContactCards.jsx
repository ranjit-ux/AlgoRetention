import {FiMail} from "react-icons/fi"
import {FaGithub} from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
const cards = [
  {
    title: "Email",
    description: "Drop a message directly",
    action: "Send mail",
    icon: FiMail,
    href: "mailto:ranjitksingh.079@gmail.com",
  },
  {
    title: "GitHub",
    description: "Report issues or contribute",
    action: "Open repo",
    icon: FaGithub,
    href: "https://github.com/ranjit-ux",
  },
  {
    title: "LinkedIn",
    description: "Connect with the developer",
    action: "Connect",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/ranjit-kumar-singh/",
  },
];

const ContactCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <a
            key={card.title}
            href={card.href}
            target="_blank"
            rel="noreferrer"
            className="
            bg-white
            border
            border-[#E8DDD2]
            rounded-[32px]
            p-5
            hover:-translate-y-1
            hover:border-[#D97757]
            transition-all
            "
          >
            <div
              className="
              w-10
              h-10
              rounded-2xl
              border
              border-[#F0B69F]
              flex
              items-center
              justify-center
              text-[#D97757]
              "
            >
              <Icon size={20} />
            </div>

            <h3 className="mt-3 text-xl font-bold">
              {card.title}
            </h3>

            <p className="mt-3 text-gray-600">
              {card.description}
            </p>

            <div
              className="
              mt-6
              flex
              items-center
              gap-2
              text-[#D97757]
              font-medium
              "
            >
              {card.action}
              <ArrowRight size={16} />
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default ContactCards;