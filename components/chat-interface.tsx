"use client"
import { motion } from "motion/react"
import { useState } from "react"
import { Send, Upload, FileText, MessageCircle, AlertCircle, Shield } from "lucide-react"

export default function ChatInterface() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      type: "ai",
      content:
        "Bonjour ! Je suis votre assistant IA pour analyser les contrats. Vous pouvez me poser des questions ou importer un document.",
      timestamp: "Il y a 2 minutes",
    },
  ])

  const quickQuestions = [
    "Ce contrat est-il risqué ?",
    "Puis-je résilier facilement ?",
    "Quelles données sont collectées ?",
    "Y a-t-il des frais cachés ?",
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
            "J'analyse votre question... Basé sur le contrat que vous avez partagé, voici mon analyse détaillée avec les points de vigilance.",
          timestamp: "À l'instant",
        },
      ])
    }, 1000)

    setMessage("")
  }

  return (
    <section id="chat" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">Chat avec l'IA</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Posez vos questions directement à notre IA spécialisée dans l'analyse de contrats
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Barre latérale */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Import de document */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-cyan-600" />
                  Importer un contrat
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-white border-2 border-dashed border-cyan-300 rounded-xl p-4 text-center hover:border-cyan-400 transition-colors group">
                    <FileText className="w-8 h-8 text-cyan-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm text-slate-600">Glissez un PDF ou cliquez</p>
                  </button>
                  <button className="w-full bg-cyan-600 text-white rounded-xl py-2 px-4 text-sm font-medium hover:bg-cyan-700 transition-colors">
                    Coller du texte
                  </button>
                </div>
              </div>

              {/* Questions rapides */}
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-slate-600" />
                  Questions rapides
                </h3>
                <div className="space-y-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(question)}
                      className="w-full text-left text-sm text-slate-600 hover:text-cyan-600 hover:bg-white rounded-lg p-3 transition-all duration-200"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Historique */}
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Historique récent</h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium text-slate-700">Contrat Netflix</p>
                    <p className="text-slate-500">Il y a 2 heures</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-slate-700">CGU Instagram</p>
                    <p className="text-slate-500">Hier</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Interface de chat */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 h-[600px] flex flex-col">
                {/* En-tête du chat */}
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-t-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Assistant IA ClairContrat</h3>
                      <p className="text-sm text-cyan-100">En ligne • Spécialisé en contrats</p>
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
                            : "bg-slate-100 text-slate-800"
                        } rounded-2xl p-4`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                        <p className={`text-xs mt-2 ${msg.type === "user" ? "text-cyan-100" : "text-slate-500"}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Exemple d'analyse IA */}
                  <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl p-6 border border-emerald-200">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-600" />
                        <h4 className="font-semibold text-slate-800">Analyse du contrat Instagram</h4>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl p-4">
                          <h5 className="font-medium text-slate-800 mb-2">Score de lisibilité</h5>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div className="bg-amber-500 h-2 rounded-full w-3/5"></div>
                            </div>
                            <span className="text-sm font-medium text-amber-600">6/10</span>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-4">
                          <h5 className="font-medium text-slate-800 mb-2">Niveau de risque</h5>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                            <span className="text-sm font-medium text-amber-600">Modéré</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-medium text-slate-800">Conseils personnalisés :</h5>
                        <ul className="space-y-1 text-sm text-slate-600">
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                            Vérifiez vos paramètres de confidentialité
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                            Limitez le partage de données avec des tiers
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                            Vous pouvez supprimer votre compte facilement
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Zone de saisie */}
                <div className="p-6 border-t border-slate-200">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Posez votre question sur le contrat..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
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
  )
}
