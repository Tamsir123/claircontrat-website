"use client"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-navy-900 to-navy-950 text-white overflow-hidden">
      {/* Effet de fond subtil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-brand-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-navy-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Section principale */}
        <div className="container mx-auto px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Header du footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img 
                    src="/logo.jpeg" 
                    alt="Consent Radar" 
                    width={40} 
                    height={40} 
                    className="rounded-lg shadow-lg"
                  />
                </motion.div>
                <span className="font-bold text-xl bg-gradient-to-r from-brand-400 to-navy-300 bg-clip-text text-transparent">
                  Consent Radar
                </span>
              </div>
              <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                L'intelligence artificielle qui démystifie vos contrats numériques 
                <span className="text-brand-400 font-medium"> pour vous protéger des clauses cachées.</span>
              </p>
            </motion.div>

            {/* Navigation simplifiée */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6 mb-8"
            >
              {[
                { name: "Analyser un contrat", href: "/chat" },
                { name: "Résumés populaires", href: "/resumes-populaires" },
                { name: "Mon historique", href: "/historique" },
                { name: "À propos", href: "/a-propos" },
                { name: "Confidentialité", href: "/confidentialite" },
                { name: "Contact", href: "/contact" }
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="text-slate-400 hover:text-brand-400 transition-all duration-200 font-medium"
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.div>

            {/* Réseaux sociaux */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex justify-center gap-4 mb-6"
            >
              {[
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Mail, href: "mailto:contact@claircontrat.fr", label: "Email" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 hover:text-brand-400 hover:bg-brand-500/10 hover:border-brand-500/30 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Ligne de séparation élégante */}
        <div className="border-t border-slate-800/50"></div>

        {/* Copyright minimaliste */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 lg:px-8 py-4"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span>&copy; {currentYear} Consent Radar.</span>
                <span>Tous droits réservés.</span>
              </div>
              
              <div className="flex items-center gap-1 text-xs">
                <span>Designé par</span>
                <span className="text-brand-400 font-medium">Tamsir et Flora</span>
                <span>pour protéger vos droits numériques</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
