import { FramedContent } from "@/components/FramedContent";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const Section4 = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What products do you use for hair and skin treatments?",
      answer:
        "We use premium, industry-approved products that are safe and effective for all hair and skin types.",
    },
    {
      question: "Do you offer home services?",
      answer:
        "Yes, we offer home services on request. Please contact us for more details.",
    },
    {
      question: "How do I book an appointment?",
      answer:
        "You can book an appointment by calling or WhatsApp messaging us. We also offer online booking.",
    },
    {
      question: "Do you offer discounts on packages?",
      answer:
        "Yes! We have regular offers and customized packages based on your needs. Follow our social media for updates.",
    },
  ];

  const WHY_CHOOSE_US = [
    {
      id: 1,
      image: "/assets/111.png",
      title: "Expert Stylists",
      description:
        "Skilled professionals who specialize in all aspects of beauty.",
    },
    {
      id: 2,
      image: "/assets/222.png",
      title: "Relaxing Atmosphere",
      description: "A peaceful, stylish space where you can unwind.",
    },
    {
      id: 3,
      image: "/assets/333.png",
      title: "Premium Products",
      description:
        "We use only the highest quality products for every service.",
    },
    {
      id: 4,
      image: "/assets/444.png",
      title: "Customer CARE",
      description:
        "Your satisfaction and well-being are at the heart of everything we do.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" bg-white">
      <div className="container flex flex-col pb-24 pt-24 gap-8">
        <h1 className="text-3xl md:text-4xl font-judson my-8 text-center">
          Why Choose Us?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {WHY_CHOOSE_US.map((item) => (
            <FramedContent
              key={item.id}
              className="bg-white shadow-lg"
              frameSrc="/assets/frame4.png"
            >
              <div className=" flex flex-col items-center gap-6 px-16 md:px-8 py-32 md:py-12">
                <div className=" flex justify-center items-center w-24 h-24 rounded-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className=" object-cover object-center w-full h-full"
                  />
                </div>
                <h1 className="text-center text-lg font-medium text-color-9 uppercase">
                  {item.title}
                </h1>
                <p className="text-center text-color-9/75">
                  {item.description}
                </p>
              </div>
            </FramedContent>
          ))}
        </div>
      </div>

      <div className="container flex flex-col pb-24 gap-8">
        <h1 className="text-3xl md:text-4xl font-judson my-8 text-center">
          Frequently Asked Questions (FAQs)
        </h1>
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-150"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              <div
                className={`px-6 transition-all duration-200 ease-in-out ${
                  openIndex === index
                    ? "py-4 opacity-100 max-h-40"
                    : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section4;
