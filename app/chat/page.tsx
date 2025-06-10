"use client"
import { motion } from "motion/react"
import { useState } from "react"
import Navigation from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Send, Upload, FileText, MessageCircle, AlertCircle, Shield, Brain } from "lucide-react"
import axios from "axios"

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [contractText, setContractText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userPreference, setUserPreference] = useState("")
  const [showRiskAlert, setShowRiskAlert] = useState(false)
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
    "Résume ce contrat",
  ]

  const userPreferences = [
    "Je suis fan de Naruto et j'aime les références manga",
    "Je préfère un langage simple et familier",
    "J'aime les références pop culture et films",
    "Utilise des métaphores sportives",
    "Parle-moi comme à un entrepreneur tech",
    "Je préfère un ton très professionnel",
  ]

  // Collage dans la zone de chat : résumé automatique
  const handlePaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text")
    if (pastedText.length > 30) { // On suppose que c'est un contrat
      setIsLoading(true)
      setContractText(pastedText)
      setMessages((prev) => [
        ...prev,
        {
          type: "user",
          content: pastedText,
          timestamp: "À l'instant",
        },
      ])
      try {
        const response = await axios.post('http://localhost:4600/contract/summary', {
          contractText: pastedText
        })
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            content: response.data.summary,
            timestamp: "À l'instant",
          },
        ])
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            content: "Désolé, une erreur s'est produite lors de l'analyse du contrat.",
            timestamp: "À l'instant",
          },
        ])
      }
      setIsLoading(false)
      setMessage("")
      e.preventDefault()
    }
  }

  // Génération d'alerte de risque personnalisée
  const handleGenerateRiskAlert = async () => {
    if (!contractText || !userPreference) {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: "Veuillez d'abord coller un contrat et sélectionner une préférence de communication.",
          timestamp: "À l'instant",
        },
      ])
      return
    }

    setIsLoading(true)
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        content: `Génère une alerte de risque personnalisée avec la préférence : ${userPreference}`,
        timestamp: "À l'instant",
      },
    ])

    try {
      const response = await axios.post('http://localhost:4600/contract/risk-alert', {
        contractText,
        userPreference
      })
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: response.data.alert,
          timestamp: "À l'instant",
        },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: "Désolé, une erreur s'est produite lors de la génération de l'alerte personnalisée.",
          timestamp: "À l'instant",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }
  const handleSendMessage = async () => {
    if (!message.trim()) return
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        content: message,
        timestamp: "À l'instant",
      },
    ])
    const currentMessage = message
    setMessage("")
    setIsLoading(true)
    try {
      if (contractText) {
        // Si un contrat est chargé, question sur le contrat
        const response = await axios.post('http://localhost:4600/contract/ask', {
          contractText,
          question: currentMessage
        })
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            content: response.data.answer,
            timestamp: "À l'instant",
          },
        ])
      } else {
        // Sinon, comportement par défaut (summary)
        const response = await axios.post('http://localhost:4600/contract/summary', {
          contractText: currentMessage
        })
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            content: response.data.summary,
            timestamp: "À l'instant",
          },
        ])
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
          timestamp: "À l'instant",
        },
      ])
    } finally {
      setIsLoading(false)
    }
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

                {/* Alerte de risque personnalisée */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-red-100 dark:border-red-800/20">
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    Alerte personnalisée
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-slate-600 dark:text-slate-300 mb-2 block">
                        Style de communication :
                      </label>
                      <select
                        value={userPreference}
                        onChange={(e) => setUserPreference(e.target.value)}
                        className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-2 text-sm text-slate-700 dark:text-slate-300"
                      >
                        <option value="">Choisir un style...</option>
                        {userPreferences.map((pref, index) => (
                          <option key={index} value={pref}>
                            {pref}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={handleGenerateRiskAlert}
                      disabled={!contractText || !userPreference || isLoading}
                      className="w-full bg-red-600 text-white rounded-lg py-2 px-4 text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Génération..." : "🚨 Générer l'alerte"}
                    </button>
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
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                          <p
                            className={`text-xs mt-2 ${msg.type === "user" ? "text-cyan-100" : "text-slate-500 dark:text-slate-400"}`}
                          >
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Indicateur de chargement */}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-2xl p-4">
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-cyan-500 border-t-transparent"></div>
                            <span className="text-sm">L'IA analyse votre message...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Zone de saisie */}
                  <div className="p-6 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onPaste={handlePaste}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !isLoading) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                        disabled={isLoading}
                        placeholder="Collez un contrat ou posez une question..."
                        className="flex-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!message.trim() || isLoading}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-3 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
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
