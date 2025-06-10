"use client"
import { motion } from "motion/react"
import { useState } from "react"
import Navigation from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Send, Upload, FileText, MessageCircle, AlertCircle, Shield, Brain } from "lucide-react"

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      type: "ai",
      content:
        "Bonjour ! Je suis votre assistant IA spécialisé dans l'analyse de contrats. Vous pouvez me poser des questions ou importer un document pour commencer l'analyse.",
      timestamp: "Il y a 2 minutes",
    },
  ])

  const quickQuestions = [
    "Ce contrat est-il risqué pour mes données ?",
    "Puis-je résilier facilement ?",
    "Quelles données personnelles sont collectées ?",
    "Y a-t-il des frais cachés ou des pénalités ?",
    "Mes données sont-elles partagées avec des tiers ?",
    "Quels sont mes droits en cas de litige ?",
  ]

  const handleSendMessage = () => {
    if (!message.trim()) return

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        content: message,
        timestamp: "À l'instant",
      },
    ])

    // Simulation de réponse IA
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content:
            "J'analyse votre question... Basé sur le contrat que vous avez partagé, voici mon analyse détaillée avec les points de vigilance et mes recommandations personnalisées.",
          timestamp: "À l'instant",
        },
      ])
    }, 1000)

    setMessage("")
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="py-24 bg-white dark:bg-slate-900 pt-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6">Chat avec l'IA</h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Posez vos questions directement à notre IA spécialisée dans l'analyse de contrats numériques
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Barre latérale */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-1 space-y-6"
              >
                {/* Import de document */}
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-cyan-100 dark:border-cyan-800/20">
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-cyan-600" />
                    Importer un contrat
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full bg-white dark:bg-slate-800 border-2 border-dashed border-cyan-300 dark:border-cyan-600 rounded-xl p-4 text-center hover:border-cyan-400 transition-colors group">
                      <FileText className="w-8 h-8 text-cyan-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-sm text-slate-600 dark:text-slate-300">Glissez un PDF ou cliquez</p>
                    </button>
                    <button className="w-full bg-cyan-600 text-white rounded-xl py-2 px-4 text-sm font-medium hover:bg-cyan-700 transition-colors">
                      Coller du texte
                    </button>
                  </div>
                </div>

                {/* Questions rapides */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6">
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-slate-600" />
                    Questions rapides
                  </h3>
                  <div className="space-y-2">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setMessage(question)}
                        className="w-full text-left text-sm text-slate-600 dark:text-slate-300 hover:text-cyan-600 hover:bg-white dark:hover:bg-slate-700 rounded-lg p-3 transition-all duration-200"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Historique */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6">
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Historique récent</h3>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium text-slate-700 dark:text-slate-300">Contrat Netflix</p>
                      <p className="text-slate-500 dark:text-slate-400">Il y a 2 heures</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-slate-700 dark:text-slate-300">CGU Instagram</p>
                      <p className="text-slate-500 dark:text-slate-400">Hier</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-slate-700 dark:text-slate-300">Conditions Spotify</p>
                      <p className="text-slate-500 dark:text-slate-400">Il y a 3 jours</p>
                    </div>
                  </div>
                </div>

                {/* Préférences utilisateur */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6">
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Mes préférences</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <span className="text-slate-600 dark:text-slate-300">Protection des données</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-slate-600 dark:text-slate-300">Clauses financières</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span className="text-slate-600 dark:text-slate-300">Conditions de résiliation</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Interface de chat */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-3"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 h-[700px] flex flex-col">
                  {/* En-tête du chat */}
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Brain className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Assistant IA ClairContrat</h3>
                        <p className="text-sm text-cyan-100">En ligne • Spécialisé en contrats numériques</p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                      <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] ${
                            msg.type === "user"
                              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                              : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                          } rounded-2xl p-4`}
                        >
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                          <p
                            className={`text-xs mt-2 ${msg.type === "user" ? "text-cyan-100" : "text-slate-500 dark:text-slate-400"}`}
                          >
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Exemple d'analyse IA */}
                    <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800/20">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-emerald-600" />
                          <h4 className="font-semibold text-slate-800 dark:text-white">Analyse du contrat Instagram</h4>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white dark:bg-slate-800 rounded-xl p-4">
                            <h5 className="font-medium text-slate-800 dark:text-white mb-2">Score de lisibilité</h5>
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                                <div className="bg-amber-500 h-2 rounded-full w-3/5"></div>
                              </div>
                              <span className="text-sm font-medium text-amber-600">6/10</span>
                            </div>
                          </div>

                          <div className="bg-white dark:bg-slate-800 rounded-xl p-4">
                            <h5 className="font-medium text-slate-800 dark:text-white mb-2">Niveau de risque</h5>
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-amber-500" />
                              <span className="text-sm font-medium text-amber-600">Modéré</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h5 className="font-medium text-slate-800 dark:text-white">Conseils personnalisés :</h5>
                          <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                              Vérifiez vos paramètres de confidentialité dans l'application
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                              Limitez le partage de données avec des applications tierces
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                              Vous pouvez supprimer votre compte à tout moment sans pénalité
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Zone de saisie */}
                  <div className="p-6 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Posez votre question sur le contrat..."
                        className="flex-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-3 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 hover:-translate-y-0.5"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
