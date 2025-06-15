"use client"
import { motion } from "framer-motion"
import { Upload, Brain, Download, ArrowRight } from "lucide-react"

export default function HowItWorksSection() {
  const steps = [
    {
      icon: Upload,
      title: "Importez votre contrat",
      description: "Collez le texte, uploadez un PDF ou prenez une photo de votre contrat. Notre système accepte tous les formats.",
      color: "from-brand-500 to-brand-600"
    },
    {
      icon: Brain,
      title: "L'IA analyse en profondeur",
      description: "Notre intelligence artificielle examine chaque clause, identifie les risques et extrait les points clés en quelques secondes.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Download,
      title: "Recevez votre analyse",
      description: "Obtenez un résumé clair, des alertes personnalisées et des recommandations pour prendre la meilleure décision.",
      color: "from-emerald-500 to-emerald-600"
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
              Comment ça marche ?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Trois étapes simples pour comprendre parfaitement vos contrats
            </p>
          </motion.div>

          {/* Étapes */}
          <div className="relative">
            {/* Ligne de connexion */}
            <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
              <div className="flex justify-between">
                <div className="w-0 h-0"></div>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="h-0.5 bg-gradient-to-r from-brand-500 to-emerald-500 mt-8"
                ></motion.div>
                <div className="w-0 h-0"></div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  {/* Icône avec numéro */}
                  <div className="relative mx-auto mb-8">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    >
                      <step.icon className="w-10 h-10 text-white" />
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-800 dark:bg-white text-white dark:text-slate-800 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Flèche pour desktop */}
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                      viewport={{ once: true }}
                      className="hidden lg:block absolute top-24 -right-6 z-20"
                    >
                      <ArrowRight className="w-6 h-6 text-brand-500" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-brand-500 to-navy-600 text-white px-8 py-4 rounded-xl hover:from-brand-600 hover:to-navy-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Essayer maintenant
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
