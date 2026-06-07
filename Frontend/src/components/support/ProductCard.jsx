const ProductCard = () => {
  return (
    <section
      className="
      bg-white
      rounded-[32px]
      p-10
      text-center
      "
    >
      <div
        className="
        w-10
        h-10
        mx-auto
        flex
        items-center
        justify-center
        rounded-2xl
        border
        border-[#F0B69F]
        text-3xl
        "
      >
        🧠
      </div>

      <h2
        className="
        text-3xl
        font-bold
        mt-3
        "
      >
        <span className="text-[#D97757]">Algo</span>Retention
      </h2>

      <p
        className="
        mt-3
        text-l
        text-gray-600
        max-w-3xl
        mx-auto
        "
      >
        Built to help programmers remember what
        they solve instead of forgetting it after
        a week.
        <br />
        Spaced repetition, built for DSA.
      </p>

      <div
        className="
        inline-block
        mt-3
        px-4
        py-1
        rounded-full
        border
        border-[#E8DDD2]
        text-gray-500
        "
      >
        v1.0 · Open Source
      </div>
    </section>
  );
};

export default ProductCard;