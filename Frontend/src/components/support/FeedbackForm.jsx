import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const FeedbackForm = () => {
  return (
    <section
      className="
      bg-white
      rounded-[32px]
      p-8
      "
    >
      <h2 className="text-3xl font-bold">
        Share Your Feedback
      </h2>

      <p className="text-gray-600 mt-2">
        Suggestions, feature requests and bug
        reports are always welcome.
      </p>

      <Textarea
        rows={8}
        className="mt-6"
        placeholder="Tell us how AlgoRetention can be improved..."
      />

      <Button className="mt-6">
        Send Feedback
      </Button>
    </section>
  );
};

export default FeedbackForm;