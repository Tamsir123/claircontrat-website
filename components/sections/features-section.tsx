"use client"
import { motion } from "framer-motion"
import { Brain, Shield, Zap, FileText, AlertTriangle, CheckCircle, Clock, Users } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "IA Avancée",
      description: "Notre intelligence artificielle analyse vos contrats avec une précision de 98% et identifie les clauses importantes en quelques secondes.",
      color: "from-brand-500 to-navy-600"
    },
    {
      icon: Shield,
      title: "Protection Maximale",
      description: "Détection automatique des clauses abusives, des frais cachés et des conditions défavorables pour vous protéger.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Zap,
      title: "Analyse Rapide",
      description: "Obtenez un résumé complet de votre contrat en moins de 2 minutes, même pour les documents les plus complexes.",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: AlertTriangle,
      title: "Alertes Personnalisées",
      description: "Recevez des alertes ciblées sur les points critiques selon vos préférences et votre profil d'utilisateur.",
      color: "from-red-500 to-pink-600"
    },
    {
      icon: FileText,
      title: "Multi-formats",
      description: "Analysez tous types de contrats : PDF, images, texte. Compatible avec tous les services numériques populaires.",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: Clock,
      title: "Historique Complet",
      description: "Gardez une trace de tous vos contrats analysés avec un historique détaillé et des comparaisons automatiques.",
      color: "from-cyan-500 to-blue-600"
    }
  ]

  return (
    <section className="py-20 bg-slate-50 dark:bg-navy-950">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* En-tête de section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6">
              Pourquoi choisir{" "}
              <span className="bg-gradient-to-r from-brand-400 to-navy-600 bg-clip-text text-transparent">
                Consent Radar
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Une solution complète pour comprendre et maîtriser vos contrats numériques grâce à l'intelligence artificielle
            </p>
          </motion.div>

          {/* Grille des fonctionnalités */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-navy-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-navy-800 hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA en bas de section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-brand-500 to-navy-600 text-white px-8 py-4 rounded-xl hover:from-brand-600 hover:to-navy-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Commencer gratuitement
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
