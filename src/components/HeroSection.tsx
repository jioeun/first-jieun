import { motion } from 'framer-motion'; 
import { ArrowDown, Github, Linkedin, Youtube, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThreeScene from './ThreeScene';

export default function HeroSection() {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/jioeun', label: 'GitHub' },
    { icon: Instagram, href: 'https://instagram.com/jiann_frs', label: 'Instagram' },
  ];

  // ⭐ Rounded star (lebih smooth)
  const starShape = {
    clipPath: 'polygon(50% 5%, 60% 30%, 85% 35%, 65% 55%, 72% 80%, 50% 65%, 28% 80%, 35% 55%, 15% 35%, 40% 30%)'
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <ThreeScene />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">

          {/* LEFT - FOTO */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex justify-start"
          >
            <motion.div
              className="relative group"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >

              {/* ✨ GLOW ANIMATED */}
              <motion.div
                className="absolute inset-0 blur-3xl opacity-70 
                bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400"
                style={starShape}
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
              />

              {/* ✨ EXTRA LIGHT GLOW */}
              <div
                className="absolute inset-0 blur-xl opacity-40 bg-white"
                style={starShape}
              />

              {/* BORDER */}
              <div
                className="absolute inset-0 border-2 border-white/30 
                shadow-[0_0_60px_rgba(255,255,255,0.4)]"
                style={starShape}
              />

              {/* IMAGE */}
              <img
                src="/DSC00121.JPG"
                alt="Profile"
                className="relative w-64 h-64 md:w-80 md:h-80 object-cover 
                shadow-xl border-4 border-white/20 z-10"
                style={starShape}
              />
            </motion.div>
          </motion.div>

          {/* RIGHT - CONTENT */}
          <div className="w-full lg:w-1/2 text-left">
            <motion.span 
              className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to My Portfolio
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-left"
            >
              Student
              <br />
              <span className="text-gradient"> Tech & Creative Enthusiast</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl text-left"
            >
              I enjoy exploring technology, and art. 
              Passionate about photography, editing, drawing, and currently learning to code.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-12"
            >
              <Button 
                size="lg" 
                className="rounded-full px-8 shadow-glow"
                onClick={() => {
                  const element = document.querySelector('#projects');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Projects
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8"
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact Me
              </Button>
            </motion.div>

            {/* SOCIAL ICONS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex items-center justify-start gap-6"
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass hover:shadow-glow transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5 text-foreground" />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* SCROLL BUTTON */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full glass animate-float cursor-pointer"
        whileHover={{ scale: 1.1 }}
        aria-label="Scroll to About"
      >
        <ArrowDown className="h-5 w-5 text-primary" />
      </motion.button>
    </section>
  );
}