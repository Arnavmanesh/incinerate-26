import { useState } from "react";
import "./Timeline.css";
import SectionHead from './components/SectionHead.jsx';
import Reveal from './components/Reveal.jsx';

const faqs = [
  {
    question: "Who can participate?",
    answer:
      "Students, innovators, builders, and aspiring entrepreneurs can participate.",
  },
  {
    question: "What is the team size?",
    answer: "Teams can consist of 1- 5 members.",
  },
  {
    question: "What is the registration fee?",
    answer: (
      <>
        A ₹149 commitment fee per participant is required during registration. The
        fee is refundable based on the applicable refund policy. Please read the
        complete{" "}
        <a
          href="https://app.notion.com/p/Terms-Conditions-3c65aa2b11a980b9ab56ea8cde01b22d"
          target="_blank"
          rel="noreferrer"
        >
          Refund Policy
        </a>{" "}
        before registering.
      </>
    ),
  },
  {
    question: "What is the Prize Pool?",
    answer:
      "The competition features an exciting Prize Pool for the top-performing teams, along with recognition and opportunities to take their ideas further.",
  },
  {
    question: "What happens after registration?",
    answer:
      "Teams submit their ideas, followed by initial shortlisting, online pitching, and the Build Sprint.",
  },
  {
    question: "What is the Build Sprint?",
    answer:
      "The Build Sprint is the development phase where shortlisted teams turn their ideas into a functional MVP with mentorship and expert guidance.",
  },
  {
    question: "How will projects be evaluated?",
    answer:
      "Projects will be evaluated based on innovation, feasibility, execution, business potential, and impact.",
  },
  {
    question: "Is participation in mentoring sessions mandatory?",
    answer:
      "Yes. Shortlisted teams must actively participate in required mentoring, pitching, and evaluation sessions.",
  },
  {
    question: "What is IEDC Incubation Support?",
    answer:
      "Promising ventures may receive an opportunity for IEDC incubation support to further develop and take their ideas forward.",
  },
  {
    question: "What happens at the Grand Finale?",
    answer:
      "The Top 10 teams will present their ventures before an expert jury, followed by the final evaluation and winner announcement.",
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
        <Reveal>
          <SectionHead eyebrow="FAQS" title="FREQUENTLY ASKED QUESTIONS." />
        </Reveal>

        {/* FAQ Accordions */}
        <Reveal delay={0.15}>
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
        </Reveal>
      </div>
    </section>
  );
}