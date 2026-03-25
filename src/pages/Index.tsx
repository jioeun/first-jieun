import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificatesSection from '@/components/CertificatesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import PhotographyCarousel from '@/components/gallery';
import FAQSection from '@/components/faqsection';

const Index = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [lang, setLang] = useState<'en' | 'id'>('en');

  // 🌙 DARK MODE
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // 🌍 LOAD GOOGLE TRANSLATE
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,id',
        },
        'google_translate_element'
      );
    };
  }, []);

  // 🌍 AUTO DETECT + SAVE LANG
  useEffect(() => {
    const savedLang = localStorage.getItem('lang');

    if (savedLang) {
      setLang(savedLang as 'en' | 'id');
      changeLanguage(savedLang as 'en' | 'id');
    } else {
      const browserLang = navigator.language.toLowerCase();
      const detected = browserLang.includes('id') ? 'id' : 'en';
      setLang(detected);
      changeLanguage(detected);
    }
  }, []);

  // 🌍 CHANGE LANGUAGE
  const changeLanguage = (language: 'en' | 'id') => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;

    if (select) {
      select.value = language;
      select.dispatchEvent(new Event('change'));
      localStorage.setItem('lang', language);
      setLang(language);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HIDDEN GOOGLE */}
      <div id="google_translate_element" className="hidden"></div>

      {/* 🌍 ANIMATED TOGGLE */}
      <div className="fixed top-5 right-5 z-50">
        <div className="relative flex items-center bg-white/80 dark:bg-black/70 backdrop-blur rounded-full p-1 shadow-lg w-[90px]">

          {/* SLIDING BACKGROUND */}
          <div
            className={`absolute top-1 bottom-1 w-[40px] rounded-full bg-primary transition-all duration-300 ${
              lang === 'id' ? 'translate-x-[45px]' : 'translate-x-0'
            }`}
          />

          {/* BUTTONS */}
          <button
            onClick={() => changeLanguage('en')}
            className="relative z-10 w-1/2 text-sm font-medium"
          >
            EN
          </button>

          <button
            onClick={() => changeLanguage('id')}
            className="relative z-10 w-1/2 text-sm font-medium"
          >
            ID
          </button>
        </div>
      </div>

      {/* WEBSITE */}
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <PhotographyCarousel />
      <CertificatesSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;