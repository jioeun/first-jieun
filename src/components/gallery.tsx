import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const photos = [
  { image: '/DSC0001.jpg', location: 'Banda Aceh', tag: 'Nature' },
  { image: '/photos/photo2.jpg', location: 'Seaside', tag: 'Nature' },
  { image: '/photos/photo3.jpg', location: 'Quiet Forest', tag: 'Nature' },
  { image: '/photos/photo4.jpg', location: 'Countryside', tag: 'Nature' },
];

export default function PhotographyCarousel() {
  const [index, setIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef(null);

  const next = () => setIndex((prev) => (prev + 1) % photos.length);
  const prev = () => setIndex((prev) => (prev - 1 + photos.length) % photos.length);

  const nextPreview = () =>
    setPreviewIndex((prev) => (prev + 1) % photos.length);

  const prevPreview = () =>
    setPreviewIndex((prev) => (prev - 1 + photos.length) % photos.length);

  useEffect(() => {
    if (isHovering) return;

    timeoutRef.current = setTimeout(() => {
      next();
    }, 4000);

    return () => clearTimeout(timeoutRef.current);
  }, [index, isHovering]);

  const getVisible = () => {
    return [-1, 0, 1].map((offset) => {
      const i = (index + offset + photos.length) % photos.length;
      return { ...photos[i], position: offset, realIndex: i };
    });
  };

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-primary font-medium block mb-2">
            Gallery
          </span>

          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Nature Photography
          </h2>

          <p className="text-muted-foreground text-sm md:text-base italic leading-relaxed">
            A quiet collection of moments I happened to notice,  
            captured gently through my pocket digital camera.
          </p>

          <div className="w-20 h-1 bg-primary mx-auto mt-6 rounded-full" />
        </div>

        {/* CAROUSEL */}
        <div
          className="relative h-[520px] flex items-center justify-center overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {getVisible().map((photo, i) => {
            const isCenter = photo.position === 0;

            return (
              <motion.div
                key={photo.image + i}
                layout
                onClick={() => setPreviewIndex(photo.realIndex)}
                className={`absolute cursor-pointer w-[300px] md:w-[380px] rounded-2xl overflow-hidden
                  ${isCenter ? 'z-10 shadow-2xl' : 'blur-[2px]'}
                `}
                animate={{
                  opacity: isCenter ? 1 : 0.4,
                  scale: isCenter ? 1 : 0.85,
                  x: photo.position * 260,
                }}
                transition={{ type: 'spring', stiffness: 120, damping: 15 }}
              >
                <div className="relative">
                  <img
                    src={photo.image}
                    alt=""
                    className="w-full h-[420px] object-cover"
                  />

                  <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
                    {photo.tag}
                  </div>
                </div>

                <div className="p-3 text-center">
                  <p className="text-sm text-muted-foreground">
                    {photo.location}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* NAV */}
          <button onClick={prev} className="absolute left-0 p-3 glass rounded-full z-20">
            <ChevronLeft />
          </button>

          <button onClick={next} className="absolute right-0 p-3 glass rounded-full z-20">
            <ChevronRight />
          </button>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-8">
          {photos.map((_, i) => (
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

      {/* FULLSCREEN PREVIEW */}
      <AnimatePresence>
        {previewIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewIndex(null)}
          >
            <motion.img
              src={photos[previewIndex].image}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* CLOSE */}
            <button
              className="absolute top-6 right-6 text-white"
              onClick={() => setPreviewIndex(null)}
            >
              <X size={28} />
            </button>

            {/* NAV */}
            <button
              className="absolute left-6 text-white"
              onClick={(e) => {
                e.stopPropagation();
                prevPreview();
              }}
            >
              <ChevronLeft size={40} />
            </button>

            <button
              className="absolute right-6 text-white"
              onClick={(e) => {
                e.stopPropagation();
                nextPreview();
              }}
            >
              <ChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}