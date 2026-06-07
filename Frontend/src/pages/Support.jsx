import ContactCards from "@/components/support/ContactCards";
import FAQSection from "@/components/support/FAQSection";
import FeedbackForm from "@/components/support/FeedbackForm";
import SupportHero from "@/components/support/SupportHero";
import ProductCard from "@/components/support/ProductCard";

const Support = () => {
  return (
    <div className="space-y-8">
      <SupportHero />

      <ProductCard />

      <ContactCards />

      <FeedbackForm />

      <FAQSection />
    </div>
  );
};

export default Support;