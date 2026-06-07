const features = [
  "Problem Tracking",
  "Revision Scheduling",
  "Retention Analytics",
];

const upcoming = [
  "Email Reminders",
  "Topic Weakness Detection",
  "Contest Tracking",
  "Interview Dashboard",
];

const RoadmapSection = () => {
  return (
    <section
      className="
      bg-white
      border
      border-[#E8E4DE]
      rounded-3xl
      p-6
      "
    >
      <h2 className="text-xl font-semibold mb-4">
        Product Roadmap
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <h3 className="font-semibold mb-2">
            Available
          </h3>

          {features.map((item) => (
            <p key={item} className="mb-2">
              ✅ {item}
            </p>
          ))}
        </div>

        <div>
          <h3 className="font-semibold mb-2">
            Coming Soon
          </h3>

          {upcoming.map((item) => (
            <p key={item} className="mb-2">
              ⏳ {item}
            </p>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RoadmapSection;