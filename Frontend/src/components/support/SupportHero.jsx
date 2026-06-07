import { Headphones } from "lucide-react";

const SupportHero = () => {
  return (
    <section
      className="
      bg-white
      rounded-[32px]
      p-8
      relative
      overflow-hidden
      "
    >
      <div
        className="
        absolute
        right-0
        top-0
        h-full
        w-64
        bg-gradient-to-l
        from-[#F4D9CF]
        to-transparent
        opacity-50
        "
      />

      <div className="relative z-10">
        <div
          className="
          inline-flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          border
          border-[#F0B69F]
          text-[#D97757]
          text-xs
          font-medium
          "
        >
          <Headphones size={13} />
          SUPPORT CENTER
        </div>

        <h1
          className="
          mt-4
          text-5xl
          font-bold
          leading-tight
          text-[#2C2C2C]
          "
        >
          We're here to{" "}
          <span className="italic text-[#D97757]">
            help you
          </span>
          <br />
          retain more.
        </h1>

        <p
          className="
          mt-4
          text
          text-gray-600
          max-w-3xl
          "
        >
          Found a bug, have a suggestion, or want
          to improve AlgoRetention? We'd love to
          hear from you.
        </p>
      </div>
    </section>
  );
};

export default SupportHero;