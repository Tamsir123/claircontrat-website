"use client"
import { motion } from "framer-motion"
import { ArrowRight, Shield, Zap } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-600 to-navy-700 dark:from-brand-800 dark:to-navy-900 relative overflow-hidden">
      {/* Effet de fond */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Contenu principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Prêt à protéger vos{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                droits numériques
              </span> ?
            </h2>
            
            <p className="text-xl text-brand-100 mb-10 leading-relaxed max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui font confiance à Consent Radar pour analyser leurs contrats en toute sécurité.
            </p>
          </motion.div>

          {/* Avantages rapides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-8 mb-10"
          >
            <div className="flex items-center gap-3 text-brand-100">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium">Analyse en 2 minutes</span>
            </div>
            <div className="flex items-center gap-3 text-brand-100">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium">100% sécurisé</span>
            </div>
            <div className="flex items-center gap-3 text-brand-100">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <span className="font-medium">Gratuit pour commencer</span>
            </div>
          </motion.div>

          {/* Boutons d'action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-brand-600 font-semibold px-8 py-4 rounded-xl hover:bg-brand-50 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center gap-3 group"
            >
              <span>Analyser mon premier contrat</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
            >
              Voir une démo
            </motion.button>
          </motion.div>

          {/* Garantie */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
            className="mt-8 text-brand-200 text-sm"
          >
            🔒 Aucune carte de crédit requise • Analyse confidentielle • Support 24/7
          </motion.div>
        </div>
      </div>
    </section>
  )
}
