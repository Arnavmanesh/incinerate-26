import { useState } from "react";
import "./Timeline.css";
import SectionHead from './components/SectionHead.jsx'

const faqs = [
  {
    question: "Who can participate in INCINERATE?",
    answer:
      "INCINERATE is open to all students, aspiring founders, developers, and creators interested in technology, product creation, and entrepreneurship regardless of their experience level.",
  },
  {
    question: "How do I register for the event?",
    answer:
      'Click the "Start Your Application" button in the application section, submit your single-paragraph proposal explaining your problem statement and team credentials before the registration deadline.',
  },
  {
    question: "What happens during the Build Phase?",
    answer:
      "During the Build Phase (The Refinery), teams focus on rapid development, mentor reviews, user validation testing, and building functional prototypes ready for final evaluation.",
  },
  {
    question: "When and where is the final pitch?",
    answer:
      "The final pitch (The Inferno) will be hosted live in front of a panel of judges and investors. Specific venue details and schedules will be communicated to shortlisted teams.",
  },
  {
    question: "Is there a prize pool?",
    answer:
      "Yes, winning teams will receive cash prizes, acceleration opportunities, investor pitch access, and community support resources.",
  },
];

export default function FAQs() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section id="faqs" className="section ">
      <div className="wrap">
        {/* Section Header */}
        <SectionHead eyebrow="FAQS" title="FREQUENTLY ASKED QUESTIONS." />

        {/* FAQ Accordions */}
        <div className="faqs-list">
          {faqs.map((faq, index) => {
            const isActive = activeFaq === index;
            return (
              <div
                key={index}
                className={`accordion-item ${isActive ? "active" : ""}`}
              >
                <button
                  type="button"
                  className="accordion-header"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isActive}
                >
                  <span className="accordion-question">{faq.question}</span>
                  <span className={`accordion-icon ${isActive ? "rotated" : ""}`}>
                    +
                  </span>
                </button>
                <div
                  className={`accordion-content ${isActive ? "open" : ""}`}
                >
                  <p className="accordion-answer">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}