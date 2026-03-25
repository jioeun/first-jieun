import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What device do you use for digital drawing?',
    answer: 'I create my digital artworks using an iPad Air 5, which allows me to draw freely and intuitively wherever I go.',
  },
  {
    question: 'Do you only focus on one type of creative work?',
    answer: 'Not really. I enjoy exploring different forms like illustration, photography, and small creative projects.',
  },
  {
    question: 'How do you usually capture your photos?',
    answer: 'I usually take photos using a pocket digital camera, capturing moments naturally without too much setup.',
  },
  {
    question: 'Can I collaborate or work with you?',
    answer: 'Yes, I am open to collaborations. Feel free to reach out through my contact links.',
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 max-w-3xl">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Questions & Answers
          </h2>
          <p className="text-muted-foreground text-sm italic">
            A little glimpse into my creative world
          </p>
        </div>

        {/* ACCORDION */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="border rounded-2xl overflow-hidden glass"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium">
                    {faq.question}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 text-sm text-muted-foreground">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}