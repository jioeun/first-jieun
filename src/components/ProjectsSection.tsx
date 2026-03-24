import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'Digital Drawing',
    description: 'A collection of my digital illustrations and creative artworks.',
    tags: ['Art', 'Drawing'],
    image: '🎨',
    color: 'from-purple-500/20 to-pink-500/20',
    ArtPortfolio: '#',
  },
  {
    title: 'Photography',
    description: 'Capturing moments with creative composition and storytelling.',
    tags: ['Photo', 'Visual'],
    image: '📸',
    color: 'from-blue-500/20 to-cyan-500/20',
    demo: '#',
  },
  {
    title: 'Editing Projects',
    description: 'Creative photo and video editing works.',
    tags: ['Editing', 'Creative'],
    image: '🎬',
    color: 'from-orange-500/20 to-red-500/20',
    youtube: '#',
  },
 
];

export default function ProjectsSection() {
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef(null);

  const next = () => setIndex((prev) => (prev + 1) % projects.length);
  const prev = () => setIndex((prev) => (prev - 1 + projects.length) % projects.length);

  // AUTO PLAY
  useEffect(() => {
    if (isHovering) return;

    timeoutRef.current = setTimeout(() => {
      next();
    }, 3000);

    return () => clearTimeout(timeoutRef.current);
  }, [index, isHovering]);

  // LOOP DATA
  const getVisible = () => {
    return [-1, 0, 1].map((offset) => {
      const i = (index + offset + projects.length) % projects.length;
      return { ...projects[i], position: offset };
    });
  };

  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium mb-2 block">Portfolio</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Projects & Karya
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* CAROUSEL */}
        <div
          className="relative h-[420px] flex items-center justify-center overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {getVisible().map((project, i) => {
            const isCenter = project.position === 0;

            return (
              <motion.div
                key={project.title + i}
                layout
                drag={isCenter ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -50) next();
                  if (info.offset.x > 50) prev();
                }}
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  x: project.position * 120,
                }}
                animate={{
                  opacity: isCenter ? 1 : 0.5,
                  scale: isCenter ? 1 : 0.85,
                  x: project.position * 220,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.7,
                  x: project.position > 0 ? 300 : -300,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 15,
                }}
                className={`absolute w-[280px] md:w-[320px] p-5 rounded-2xl
                  ${isCenter 
                    ? 'glass shadow-[0_0_40px_rgba(99,102,241,0.4)] z-10' 
                    : 'glass blur-[2px]'
                  }
                `}
              >
                <div className={`aspect-video rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${project.color}`}>
                  <span className="text-5xl">{project.image}</span>
                </div>

                <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-secondary rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                <Button size="sm" className="rounded-full w-full" asChild>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View
                  </a>
                </Button>
              </motion.div>
            );
          })}

          {/* NAV BUTTONS */}
          <button
            onClick={prev}
            className="absolute left-0 p-2 glass rounded-full z-20"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-0 p-2 glass rounded-full z-20"
          >
            <ChevronRight />
          </button>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full cursor-pointer transition-all ${
                i === index ? 'bg-primary w-6' : 'bg-muted w-2'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}