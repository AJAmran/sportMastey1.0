import { useState } from "react";
import animationData from "../../assets/question.json";
import Lottie from "lottie-react-web";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const questions = [
    {
      question: "How long are the sports courses?",
      answer: "The duration of our sports courses varies depending on the program. Most courses range from 6 to 12 weeks.",
    },
    {
      question: "What sports courses do you offer?",
      answer: "We offer a wide range of sports courses, including basketball, soccer, tennis, swimming, martial arts, yoga, and more. Visit our course catalog for a complete list.",
    },
    {
      question: "Are the sports courses suitable for beginners?",
      answer: "Yes, we welcome participants of all skill levels. Our courses are designed to cater to beginners, intermediate, and advanced athletes.",
    },
    {
      question: "What equipment or gear do I need for the sports courses?",
      answer: "The required equipment or gear varies depending on the course. We provide a detailed list of required items on each course's page. Typically, participants need sports shoes, comfortable clothing, and any specialized equipment mentioned in the course description.",
    },
    {
      question: "Can I cancel or reschedule my sports course?",
      answer: "Yes, we understand that circumstances may change. You can cancel or reschedule your sports course by contacting our customer support team at least 48 hours before the course start date.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold my-6 text-center">Frequently Asked Questions</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3">
          {questions.map((item, index) => (
            <div key={index} className="border border-gray-300 rounded-md mb-4">
              <button
                className="w-full flex justify-between items-center py-3 px-4 bg-gray-800 hover:bg-gray-600 focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-lg font-medium text-white">{item.question}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    index === activeIndex ? "transform rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {index === activeIndex && (
                <div className="py-3 px-4 bg-gray-200">
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="md:col-span-2">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
            }}
            height={300} // Set the desired height of the animation
            width={300} // Set the desired width of the animation
          />
        </div>
      </div>
    </div>
  );
};

export default Accordion;
