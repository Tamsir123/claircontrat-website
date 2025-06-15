"use client"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sophie Martin",
      role: "Freelance Designer",
      content: "Consent Radar m'a sauvé d'un contrat avec des clauses très défavorables. L'analyse était claire et précise, j'ai pu négocier de meilleurs termes !",
      rating: 5,
      avatar: "SM"
    },
    {
      name: "Thomas Dubois",
      role: "Entrepreneur",
      content: "En tant que CEO, je reçois beaucoup de contrats. Cet outil me fait gagner des heures et me protège des pièges juridiques. Indispensable !",
      rating: 5,
      avatar: "TD"
    },
    {
      name: "Emma Rodriguez",
      role: "Étudiante",
      content: "Super simple à utiliser ! J'ai analysé mes contrats d'abonnement et découvert des frais cachés. Merci Consent Radar de protéger les consommateurs.",
      rating: 5,
      avatar: "ER"
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-navy-900">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* En-tête */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Découvrez comment Consent Radar aide des milliers de personnes à mieux comprendre leurs contrats
            </p>
          </motion.div>

          {/* Grille des témoignages */}
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-slate-50 dark:bg-navy-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-navy-700 hover:shadow-xl transition-all duration-300 relative group"
              >
                {/* Icône de citation */}
                <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity">
                  <Quote className="w-8 h-8 text-brand-500" />
                </div>

                {/* Étoiles */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Star className="w-5 h-5 text-amber-400 fill-current" />
                    </motion.div>
                  ))}
                </div>

                {/* Contenu */}
                <blockquote className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Profil */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-brand-500 to-navy-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Badges de confiance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-8 mt-16 opacity-60"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white fill-current" />
              </div>
              <span className="text-slate-600 dark:text-slate-400 font-medium">Note moyenne : 4.9/5</span>
            </div>
            <div className="w-px h-8 bg-slate-300 dark:bg-slate-600"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <span className="text-slate-600 dark:text-slate-400 font-medium">Recommandé par 97% des utilisateurs</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
