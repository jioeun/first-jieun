import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const certificates = [
  {
    title: '1st Place Speech Competition - MARSSAL 8',
    issuer: 'MARSSAL 8',
    date: '2022',
    credentialId: 'MARSSAL8-1ST-2022',
    image: '🥇',
    color: 'from-yellow-400/20 to-orange-400/20',
    link: '#',
  },
  {
    title: '2nd Place Speech Competition - COMET 1',
    issuer: 'COMET 1',
    date: '2022',
    credentialId: 'COMET1-2ND-2022',
    image: '🥈',
    color: 'from-gray-400/20 to-slate-400/20',
    link: '#',
  },
  {
    title: '3rd Place Speech Competition - COMET 3',
    issuer: 'COMET 3',
    date: '2024',
    credentialId: 'COMET3-3RD-2024',
    image: '🥉',
    color: 'from-orange-400/20 to-amber-400/20',
    link: '#',
  },
  {
    title: 'Best Student Award - MIN Model',
    issuer: 'MIN Model',
    date: '2022',
    credentialId: 'MINMODEL-BEST-2022',
    image: '🏅',
    color: 'from-green-400/20 to-emerald-400/20',
    link: '#',
  },
  {
    title: 'Best Student Award - MTsN Model',
    issuer: 'MTsN Model',
    date: '2025',
    credentialId: 'MTSNMODEL-BEST-2025',
    image: '🎓',
    color: 'from-blue-400/20 to-indigo-400/20',
    link: '#',
  },
  {
    title: 'Head of Science & Technology Division (OSIM)',
    issuer: 'OSIM Organization',
    date: '2024/2025',
    credentialId: 'OSIM-IPTEK-CHAIR-2025',
    image: '📋',
    color: 'from-purple-400/20 to-pink-400/20',
    link: '#',
  },
];

export default function CertificatesSection() {
  return (
    <section id="certificates" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">Credentials</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Certificates &amp; Achievements
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 glass rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${cert.color}`}>
                  <span className="text-3xl">{cert.image}</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Award className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{cert.date}</span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground/70 font-mono">
                    ID: {cert.credentialId}
                  </p>
                  
                  <Button variant="outline" size="sm" className="rounded-full mt-2" asChild>
                    <a href={cert.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Verify
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}