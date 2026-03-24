import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Code2, Video, Coffee, Rocket, ChevronDown } from 'lucide-react';

export default function AboutSection() {
  const [openIndex, setOpenIndex] = useState(0); // auto open pertama

  const stats = [
    { icon: Code2, value: 'Beginner', label: 'Learning Coding' },
    { icon: Video, value: 'Creative', label: 'Content & Editing' },
    { icon: Coffee, value: 'Active', label: 'Organization' },
    { icon: Rocket, value: 'Growing', label: 'Public Speaking' },
  ];

  const accordionData = [
    {
      title: 'About Me',
      content:
        'I am a student who is passionate about technology, art, and public speaking. Since middle school, I have been actively involved in student organizations (OSIM), where I developed leadership, teamwork, and responsibility. I also enjoy participating in speech and debate competitions, which have helped me build confidence and improve my communication skills. I love exploring new ideas and continuously growing both creatively and intellectually.',
    },
    {
      title: 'My Interests',
      content:
        'I have a strong interest in creative and digital activities such as photography, photo and video editing, and drawing. These hobbies allow me to express my ideas visually and improve my creativity. I also enjoy being involved in organizational activities and public speaking, as they help me grow my confidence, communication skills, and ability to work with others.',
    },
    {
      title: 'Currently Learning',
      content:
        'Right now, I am learning coding and building my foundation in web development while continuing to grow in creativity and communication.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">About Me</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Get to Know Me
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden glass shadow-card flex items-center justify-center text-7xl">
                🎨
              </div>
              <div className="absolute -bottom-6 -right-6 p-4 glass rounded-xl shadow-card">
                <p className="font-display font-bold text-xl text-gradient">Student</p>
                <p className="text-sm text-muted-foreground">Learning & Growing</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold">
              Creative & Tech Enthusiast
            </h3>

            {/* ACCORDION */}
            <div className="space-y-4">
              {accordionData.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <motion.div
                    key={index}
                    layout
                    className={`rounded-xl overflow-hidden transition-all duration-300
                      ${
                        isOpen
                          ? 'bg-gradient-to-r from-primary/20 via-purple-500/20 to-indigo-500/20 shadow-[0_0_25px_rgba(99,102,241,0.4)] border border-primary/30'
                          : 'glass'
                      }`}
                  >
                    {/* HEADER */}
                    <button
                      onClick={() =>
                        setOpenIndex(isOpen ? null : index)
                      }
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <span
                        className={`font-medium transition ${
                          isOpen ? 'text-primary' : ''
                        }`}
                      >
                        {item.title}
                      </span>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={isOpen ? 'text-primary' : ''}
                      >
                        <ChevronDown />
                      </motion.div>
                    </button>

                    {/* CONTENT */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-4 pb-4 text-muted-foreground"
                        >
                          {item.content}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-4 glass rounded-xl text-center hover:shadow-card-hover transition-shadow"
                >
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="font-display text-lg font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}