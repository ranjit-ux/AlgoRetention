import {Accordion,AccordionContent,AccordionItem,AccordionTrigger,} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does the revision system work?",
    a: "Problems are scheduled for future reviews based on your revision performance.",
  },
  {
    q: "What is Retention Score?",
    a: "It estimates how well you remember solved problems over time.",
  },
  {
    q: "Why is a problem showing as due today?",
    a: "Its scheduled revision date has arrived.",
  },
  {
    q: "How often should I revise?",
    a: "Try completing all due revisions daily for best retention.",
  },
  {
    q: "Can I edit notes later?",
    a: "Yes, problem notes and metadata can be edited anytime.",
  },
  {
    q: "Does deleting a problem affect analytics?",
    a: "Yes, deleted problems are removed from calculations.",
  },
  {
    q: "What do Again, Hard, Good and Easy mean?",
    a: "They indicate how well you remembered a problem and adjust future revision intervals.",
  },
  {
    q: "Why did my retention score decrease?",
    a: "Missed revisions and forgotten problems lower retention.",
  },
  {
    q: "Are company tags automatically fetched?",
    a: "Yes, company mappings are automatically attached when available.",
  },
  {
    q: "Will reminders be added in future?",
    a: "Yes, reminder functionality is planned for future updates.",
  },
];

const FAQSection = () => {
  return (
    <section className=" bg-white rounded-3xl p-8">
      <h2 className="text-xl font-bold mb-6">
        Frequently Asked Questions
      </h2>

      <Accordion
        type="single"
        collapsible
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
          >
            <AccordionTrigger>
              {faq.q}
            </AccordionTrigger>

            <AccordionContent>
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;