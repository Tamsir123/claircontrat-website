"use client"
import { motion } from "framer-motion"
import { TrendingUp, Users, Shield, Clock } from "lucide-react"

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      number: "50,000+",
      label: "Utilisateurs actifs",
      description: "Font confiance à Consent Radar"
    },
    {
      icon: Shield,
      number: "98.5%",
      label: "Précision de l'IA",
      description: "Dans la détection des clauses"
    },
    {
      icon: Clock,
      number: "2 min",
      label: "Temps moyen",
      description: "Pour analyser un contrat"
    },
    {
      icon: TrendingUp,
      number: "15,000+",
      label: "Contrats analysés",
      description: "Chaque mois"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-brand-50 to-navy-50 dark:from-navy-950 dark:to-brand-950">
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
              Des résultats qui parlent
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui protègent leurs droits numériques avec Consent Radar
            </p>
          </motion.div>

          {/* Grille des statistiques */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-navy-900 rounded-2xl p-8 shadow-lg border border-brand-100 dark:border-brand-800/20 hover:shadow-xl transition-all duration-300 group text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-brand-500 to-navy-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1, type: "spring", stiffness: 100 }}
                  viewport={{ once: true }}
                  className="text-4xl lg:text-5xl font-bold text-brand-600 dark:text-brand-400 mb-2"
                >
                  {stat.number}
                </motion.div>
                
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Citation inspirante */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16 bg-white dark:bg-navy-900 rounded-2xl p-8 shadow-lg border border-brand-100 dark:border-brand-800/20"
          >
            <blockquote className="text-2xl font-medium text-slate-700 dark:text-slate-300 italic mb-4">
              "Depuis que j'utilise Consent Radar, je signe mes contrats en toute confiance. Fini les mauvaises surprises !"
            </blockquote>
            <cite className="text-brand-600 dark:text-brand-400 font-semibold">— Marie L., Utilisatrice depuis 6 mois</cite>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
