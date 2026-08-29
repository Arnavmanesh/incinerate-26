import { useState } from "react";

const faqs = [
  {
    question: "Who can participate in INCINERATE?",
    answer:
      "INCINERATE is open to students, aspiring founders, and innovators who want to build and pitch real solutions. Teams and solo participants are welcome, provided they meet the eligibility criteria outlined in the official guidelines.",
  },
  {
    question: "How do I register for the event?",
    answer:
      "Registration opens through the official INCINERATE portal. Click the Ignite Project button, complete your team and idea details, and submit before the registration deadline to secure your spot.",
  },
  {
    question: "What happens during the Build Phase?",
    answer:
      "During the Build Phase, participants refine their ideas, develop prototypes, and receive mentorship through workshops, review sessions, and accelerator-style support programs designed to strengthen product and business execution.",
  },
  {
    question: "When and where is the final pitch?",
    answer:
      "The final pitching arena takes place on 4th October 2026 at Jain University, Kochi. Shortlisted teams will present their solutions to mentors and evaluators for feedback and recognition.",
  },
  {
    question: "Is there a prize pool?",
    answer:
      "Yes. INCINERATE features a prize pool for outstanding teams and projects. Details on categories, amounts, and eligibility are shared in the Prize Pool section and official event brief.",
  },
];

export default function FAQs() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section id="faqs" className="section-container">
      <h2 className="section-title">FAQs</h2>
      <div className="glass-card">
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeFaq === index ? "faq-item-active" : ""}`}
            >
              <button
                type="button"
                className="faq-question"
                onClick={() => toggleFaq(index)}
                aria-expanded={activeFaq === index}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">+</span>
              </button>
              {activeFaq === index && (
                <p className="faq-answer">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
