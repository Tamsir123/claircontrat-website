"use client"
import { motion } from "framer-motion"
import { NavbarButton } from "@/components/ui/resizable-navbar"
import { Brain, FileText, Shield, Zap } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-brand-50/30 to-brand-50/20 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950 pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenu principal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.h1
                  className="text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Comprenez ce que vous{" "}
                  <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                    signez
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Grâce à l'intelligence artificielle, obtenez un résumé clair et des alertes personnalisées sur vos
                  contrats numériques. Protégez-vous des clauses cachées et prenez des décisions éclairées en toute
                  confiance.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <NavbarButton variant="primary" className="text-lg px-8 py-4" href="/chat">
                  Analyser un contrat maintenant
                </NavbarButton>
                <NavbarButton variant="secondary" className="text-lg px-8 py-4" href="/demo">
                  Voir une démo
                </NavbarButton>
              </motion.div>

              {/* Statistiques */}
              <motion.div
                className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200 dark:border-navy-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-500 dark:text-brand-400">15k+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Contrats analysés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-500 dark:text-brand-400">98%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Précision IA</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-500 dark:text-brand-400">2min</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Temps moyen</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Illustration - Contrat simplifié avec IA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative bg-white dark:bg-navy-800 rounded-3xl shadow-2xl p-8 border border-brand-100 dark:border-brand-800/20">
                <div className="space-y-6">
                  {/* En-tête du contrat */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-brand-400 to-brand-600 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white">Conditions d'utilisation</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Instagram • 47 pages</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-8 h-8 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Analyse IA */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-brand-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Niveau de risque: Modéré
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Collecte étendue de données personnelles
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Résiliation: Facile</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Suppression possible à tout moment</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Brain className="w-5 h-5 text-brand-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">IA recommande</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Vérifiez vos paramètres de confidentialité
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Score de lisibilité */}
                  <div className="bg-slate-50 dark:bg-navy-700 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Score de lisibilité
                      </span>
                      <span className="text-sm font-bold text-amber-600">6/10</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-navy-600 rounded-full h-2">
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full w-3/5"></div>
                    </div>
                  </div>
                </div>

                {/* Effets de brillance */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full opacity-15 blur-xl"></div>
              </div>
            </motion.div>
          </div>

     

          {/* Bandeau de confiance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-16 bg-white dark:bg-navy-800 rounded-2xl p-8 shadow-lg border border-brand-100 dark:border-brand-800/20"
          >
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Faites confiance à Consent Radar</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Rejoignez des milliers d'utilisateurs qui protègent leurs droits numériques avec notre IA
              </p>
              <div className="flex justify-center items-center gap-6 mt-8 opacity-70">
                {/* Instagram */}
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>

                {/* Spotify */}
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                </div>

                {/* YouTube */}
                <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>

                {/* WhatsApp */}
                <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                  </svg>
                </div>

                {/* Discord */}
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z"/>
                  </svg>
                </div>

                {/* Netflix */}
                <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.71.002-22.95zM5.398 1.05V24c2.873-.086 5.81-.406 8.489-.618V9.637z"/>
                  </svg>
                </div>

                {/* Amazon */}
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726-1.548.41-3.14.615-4.777.615-2.692 0-5.276-.645-7.758-1.948-.252-.133-.463-.25-.632-.35l-.613-.35c-.133-.074-.2-.15-.2-.233 0-.066.028-.117.084-.15zm7.913-6.986c0 .73.195 1.314.585 1.75.39.437.975.656 1.756.656.781 0 1.495-.24 2.142-.72.648-.48.972-1.149.972-2.007 0-.858-.324-1.527-.972-2.007-.647-.48-1.361-.72-2.142-.72-.781 0-1.366.22-1.756.657-.39.436-.585 1.02-.585 1.75v.64zm-2.491 4.644c-.39 0-.697-.09-.92-.27-.224-.18-.336-.42-.336-.72 0-.3.112-.54.336-.72.223-.18.53-.27.92-.27.39 0 .697.09.92.27.224.18.336.42.336.72 0 .3-.112.54-.336.72-.223.18-.53.27-.92.27z"/>
                  </svg>
                </div>

                {/* PayPal */}
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a9.36 9.36 0 0 1-.077.437c-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287z"/>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
