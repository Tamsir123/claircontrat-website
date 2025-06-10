"use client"
import { motion } from "motion/react"
import { useState, useRef, useEffect } from "react"
import Navigation from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Send, Upload, FileText, MessageCircle, AlertCircle, Brain, Trash2, Copy, Download } from "lucide-react"
import axios from "axios"
import { MessageFormatter } from "@/lib/message-formatter"

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [contractText, setContractText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userPreference, setUserPreference] = useState("")
  const [messages, setMessages] = useState<Array<{
    type: string;
    content: string;
    timestamp: string;
    indicator?: string;
    analysisType?: string;
  }>>([
    {
      type: "ai",
      content: "👋 Salut ! Je suis Consent Radar AI, votre assistant intelligent pour l'analyse de contrats. Comment puis-je vous aider ?",
      timestamp: new Date().toLocaleTimeString(),
      indicator: "🤖 ASSISTANT IA"
    },
  ])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickQuestions = [
    "Résume-moi ce contrat", // → SUMMARY
    "Analyse personnalisée selon mon profil", // → RISK-ALERT (si profil sélectionné)
    "Bonjour, comment ça marche ?", // → CHAT
    "Quels sont mes risques pour moi ?", // → RISK-ALERT (si profil sélectionné)
    "Comment puis-je résilier ?", // → CHAT
    "Explique-moi cette clause" // → CHAT
  ]

  const userPreferences = [
    { value: "", label: "Sélectionnez votre profil" },
    { value: "football_fan", label: "⚽ Passionné de Football" },
    { value: "basketball_fan", label: "🏀 Fan de Basketball" },
    { value: "anime_lover", label: "🎌 Amateur d'Anime" },
    { value: "gamer", label: "🎮 Joueur/Gameuse" },
    { value: "music_lover", label: "🎵 Mélomane" },
    { value: "movie_buff", label: "🎬 Cinéphile" },
    { value: "tech_enthusiast", label: "💻 Passionné de Tech" },
    { value: "social_media_user", label: "📱 Utilisateur de Réseaux Sociaux" },
    { value: "student", label: "🎓 Étudiant(e)" },
    { value: "parent", label: "👨‍👩‍👧‍👦 Parent" }
  ]

  // Auto-scroll vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Fonction pour coller un contrat
  const handlePaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text")
    if (pastedText.length > 100) {
      setContractText(pastedText)
      // Ne pas ajouter "Analyse ce contrat :" automatiquement
      // L'utilisateur peut taper ce qu'il veut
      setMessage(pastedText.substring(0, 500)) // Juste coller le texte
      e.preventDefault()
    }
  }

  // Fonction ULTRA-INTELLIGENTE pour déterminer quel endpoint utiliser
  const detectMessageType = (message: string) => {
    const lowerMessage = message.toLowerCase()
    
    // 🚫 D'ABORD : Exclure "analyse ce contrat : [courte question]" (vont vers CHAT)
    // Si le message contient "analyse ce contrat :" mais est court (< 800 caractères), c'est une question
    const containsAnalyseContrat = lowerMessage.includes('analyse ce contrat :')
    const isShortMessage = message.length < 800
    
    if (containsAnalyseContrat && isShortMessage) {
      console.log('🔍 Détecté: "analyse ce contrat" + question courte → CHAT')
      return contractText ? 'contract_question' : 'general_chat'
    }
    
    // 🚫 ENSUITE : Exclure les demandes d'explication/clarification (vont vers CHAT)
    const explanationKeywords = [
      'explique', 'explique en details', 'explique-moi', 'clarrifie', 'clarifie', 'que signifie', 'qu\'est-ce que', 'c\'est quoi',
      'que veut dire', 'ça veut dire quoi', 'comment comprendre', 'peux-tu expliquer',
      'détaille', 'détaille-moi', 'précise', 'éclaircis', 'éclairci', 'pourquoi'
    ]
    
    const hasExplanationRequest = explanationKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    )
    
    // Si c'est une demande d'explication, toujours vers CHAT (même si ça dit "analyse")
    if (hasExplanationRequest) {
      return contractText ? 'contract_question' : 'general_chat'
    }
    
    // 1. 📋 SUMMARY : SEULEMENT pour résumé complet d'un NOUVEAU contrat
    
    // Demandes TRÈS explicites de résumé complet SEULEMENT
    const summaryOnlyKeywords = [
      'résume tout ce contrat', 'résumer entièrement ce contrat', 'résumé complet du contrat', 
      'fais moi un résumé général', 'résume moi l\'ensemble de ce contrat',
      'résumé global', 'vue d\'ensemble du contrat'
    ]
    
    const hasExplicitSummaryRequest = summaryOnlyKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    )
    
    // Détection d'un VRAI nouveau contrat complet collé (très restrictif)
    const contractKeywords = [
      'conditions d\'utilisation', 'conditions générales', 'cgu', 'cgv', 'cgs',
      'politique de confidentialité', 'privacy policy', 'termes et conditions',
      'accord utilisateur', 'licence utilisateur', 'contrat de service'
    ]
    
    const hasContractKeywords = contractKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    )
    
    const isVeryLongText = message.length > 1500 // Seuil ENCORE plus élevé
    const hasLegalStructure = /article|clause|section|paragraphe|§|\d+\.|alinéa/i.test(message)
    const hasContractPhrase = /nous collectons|vous acceptez|en utilisant|ce service|cette application/i.test(message)
    const hasMultipleClauses = (message.match(/article|clause|section/gi) || []).length >= 3
    
    // SUMMARY SEULEMENT si :
    // - Demande TRÈS explicite de résumé complet OU
    // - TRÈS long texte + mots-clés contrat + structure légale + plusieurs clauses
    if (hasExplicitSummaryRequest || 
        (isVeryLongText && hasContractKeywords && hasLegalStructure && hasMultipleClauses)) {
      return 'contract_analysis'
    }

    // 2. 🚨 RISK-ALERT : Demandes d'analyse personnalisée avec profil
    const riskAnalysisKeywords = [
      'analyse personnalisée', 'selon mon profil', 'pour moi spécifiquement', 'adapté à mon profil',
      'risques pour moi', 'mes risques spécifiques', 'danger pour moi', 'préoccupant pour mon profil',
      'en tant que joueur', 'en tant que parent', 'en tant qu\'étudiant',
      'alerte personnalisée', 'risques selon mon profil', 'adapte à mon profil de'
    ]
    
    const hasRiskKeywords = riskAnalysisKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    )
    
    // RISK-ALERT seulement avec contexte contrat ET profil ET demande TRÈS explicite
    if (contractText && userPreference && hasRiskKeywords) {
      return 'risk_alert'
    }

    // Questions directes sur un contrat existant - REDIRECTION VERS CHAT
    // Utilisation de 'general_chat' pour toutes les questions sur le contrat existant
    // 🚫 Commenté: Ne plus utiliser le type 'contract_question'
    /*
    const contractQuestionKeywords = [
      'explique', 'explique-moi', 'que signifie', 'qu\'est-ce que', 'c\'est quoi',
      'cette clause', 'ce point', 'cette partie', 'ce passage', 'cette section',
      'peux-tu expliquer', 'comment ça marche', 'pourquoi cette', 'comment cette',
      'est-ce que je peux', 'ai-je le droit', 'puis-je faire',
      'comment résilier', 'comment annuler', 'comment me désabonner',
      'que veut dire', 'ça veut dire quoi', 'signification de'
    ]
    
    const hasQuestionKeywords = contractQuestionKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    )
    
    if (contractText && hasQuestionKeywords) {
      return 'contract_question'
    }
    */

    // 4. 🤖 GENERAL_CHAT : Tout le reste (conversations, aide générale, questions sur contrat)
    return 'general_chat'
  }

  // Fonction principale pour le chat intelligent
  const handleSendMessage = async () => {
    if (!message.trim()) return
    
    const currentMessage = message
    setMessage("")
    setIsLoading(true)
    
    // Ajouter le message utilisateur
    const newUserMessage = {
      type: "user",
      content: currentMessage,
      timestamp: new Date().toLocaleTimeString(),
    }
    
    setMessages(prev => [...prev, newUserMessage])

    try {
      // Détecter le type de message et utiliser l'endpoint approprié
      const messageType = detectMessageType(currentMessage)
      console.log('🎯 Type de message détecté:', messageType)
      console.log('📝 Message:', currentMessage.substring(0, 100) + '...')
      console.log('📋 Contrat existant:', !!contractText)
      console.log('👤 Profil utilisateur:', userPreference || 'Aucun')
      
      let response
      let aiResponse = ""

      switch (messageType) {
        case 'contract_analysis':
          // 📋 SUMMARY: Analyser un nouveau contrat OU demande explicite de résumé
          console.log('📋 Résumé de contrat → Utilisation du SUMMARY')
          response = await axios.post('http://localhost:4600/contract/summary', {
            contractText: currentMessage
          })
          aiResponse = response.data.summary
          setContractText(currentMessage) // Sauvegarder le contrat pour la suite
          break

        case 'risk_alert':
          // 🚨 RISK-ALERT: Analyse personnalisée selon le profil
          console.log('🚨 Analyse personnalisée → Utilisation du RISK-ALERT')
          if (!contractText || !userPreference) {
            aiResponse = "⚠️ Pour une analyse personnalisée, j'ai besoin d'un contrat et que vous sélectionniez votre profil dans la barre latérale."
          } else {
            response = await axios.post('http://localhost:4600/contract/risk-alert', {
              contractText,
              userPreference,
              followUpQuestion: currentMessage
            })
            aiResponse = response.data.riskAlert
          }
          break

        case 'contract_question':
          // 🚫 Ce cas ne devrait plus jamais être atteint - gardé pour compatibilité
          console.log('💡 Question sur le contrat → Redirection vers CHAT (compatibilité)')
          const chatHistoryForQuestion = messages.map(msg => ({
            type: msg.type,
            content: msg.content
          }))
          
          response = await axios.post('http://localhost:4600/ai/chat', {
            message: currentMessage,
            conversationHistory: chatHistoryForQuestion,
            contractContext: contractText || null,
            userProfile: userPreference || null,
            // Indiquer que c'est une question sur contrat pour le prompt
            messageType: 'contract_question'
          })
          
          aiResponse = response.data.response
          break

        case 'general_chat':
        default:
          // 🤖 CHAT: Conversations générales, questions, clarifications, questions sur contrat
          console.log('🤖 Conversation générale/Question sur contrat → Utilisation du CHAT')
          const conversationHistory = messages.map(msg => ({
            type: msg.type,
            content: msg.content
          }))

          response = await axios.post('http://localhost:4600/ai/chat', {
            message: currentMessage,
            conversationHistory: conversationHistory,
            contractContext: contractText || null,
            userProfile: userPreference || null
          })
          
          aiResponse = response.data.response
          break
      }
      
      // Ajouter des indicateurs visuels selon le type d'analyse
      const typeIndicators = {
        'contract_analysis': '📋 RÉSUMÉ AUTOMATIQUE',
        'risk_alert': '🚨 ANALYSE PERSONNALISÉE',
        'contract_question': '💡 RÉPONSE CIBLÉE',
        'general_chat': '🤖 CONVERSATION'
      }
      
      const newAIMessage = {
        type: "ai",
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString(),
        analysisType: messageType,
        indicator: typeIndicators[messageType]
      }
      
      setMessages(prev => [...prev, newAIMessage])
      
    } catch (error: any) {
      console.error('Erreur Chat API:', error)
      const errorMessage = {
        type: "ai" as const,
        content: "❌ Désolé, une erreur s'est produite. Vérifiez que le backend est démarré sur le port 4600.\n\n🔧 **Détails :** " + (error.response?.data?.error || error.message),
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour cliquer sur une question rapide
  const handleQuickQuestion = (question: string) => {
    setMessage(question)
  }

  // Fonction pour effacer la conversation
  const clearConversation = () => {
    setMessages([
      {
        type: "ai",
        content: "👋 Conversation effacée ! Comment puis-je vous aider ?",
        timestamp: new Date().toLocaleTimeString(),
      },
    ])
    setContractText("")
  }

  // Fonction automatique pour générer une alerte dès qu'une préférence est sélectionnée
  const handlePreferenceChange = async (newPreference: string) => {
    setUserPreference(newPreference)
    
    // Si il y a un contrat ET une préférence sélectionnée, générer automatiquement l'alerte
    if (contractText && newPreference) {
      setIsLoading(true)
      
      const selectedProfile = userPreferences.find(p => p.value === newPreference)?.label
      const alertMessage = `🚨 Analyse personnalisée automatique pour : ${selectedProfile}`
      
      // Ajouter le message utilisateur dans le chat
      const newUserMessage = {
        type: "user",
        content: alertMessage,
        timestamp: new Date().toLocaleTimeString(),
        indicator: undefined // Ajout pour correspondre au type
      }
      
      setMessages(prev => [...prev, newUserMessage])

      try {
        // Utiliser le CHAT INTELLIGENT pour l'analyse personnalisée automatique
        console.log('🚨 Génération automatique d\'alerte personnalisée via CHAT')
        console.log('📤 Envoi vers backend CHAT:', {
          contractText: contractText.substring(0, 100) + '...',
          userPreference: newPreference
        })
        
        // Construire l'historique de conversation
        const conversationHistory = messages.map(msg => ({
          type: msg.type,
          content: msg.content
        }))

        // Utiliser le chat intelligent avec messageType = 'risk_alert'
        const response = await axios.post('http://localhost:4600/ai/chat', {
          message: `Analyse personnalisée selon mon profil ${selectedProfile}`,
          conversationHistory: conversationHistory,
          contractContext: contractText,
          userProfile: newPreference,
          messageType: 'risk_alert'
        })
        
        console.log('📥 Réponse complète du backend CHAT:', response.data)
        console.log('📋 Contenu response:', response.data.response)
        
        // Vérifier si la réponse existe
        const riskAlertContent = response.data?.response || "Aucune analyse générée"
        
        // Ajouter la réponse de l'IA avec l'indicateur approprié
        const newAIMessage = {
          type: "ai",
          content: `🚨 **Analyse personnalisée (${selectedProfile}) :**\n\n${riskAlertContent}\n\n🎯 *Cette analyse est adaptée automatiquement à votre profil. Changez de profil pour une nouvelle analyse !*`,
          timestamp: new Date().toLocaleTimeString(),
          analysisType: 'risk_alert',
          indicator: '🚨 ANALYSE PERSONNALISÉE'
        }
        
        setMessages(prev => [...prev, newAIMessage])
        
      } catch (error: any) {
        console.error('Erreur alerte risque:', error)
        console.error('Détails de l\'erreur:', error.response?.data)
        const errorMessage = {
          type: "ai" as const,
          content: "❌ Erreur lors de la génération automatique de l'alerte personnalisée.\n\n🔧 **Détails :** " + (error.response?.data?.error || error.message || "Erreur inconnue"),
          timestamp: new Date().toLocaleTimeString(),
          indicator: '❌ ERREUR'
        }
        setMessages(prev => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
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

                {/* Contrôles de conversation */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800/20">
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                    Conversation
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={clearConversation}
                      className="w-full bg-red-100 hover:bg-red-200 text-red-700 rounded-lg py-2 px-4 text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Effacer le chat
                    </button>
                    {contractText && (
                      <div className="bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800/20 rounded-lg p-3">
                        <p className="text-sm text-green-700 dark:text-green-300">
                          ✅ Contrat en contexte ({contractText.length} caractères)
                        </p>
                      </div>
                    )}
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Messages: {messages.length}
                    </div>
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
                    Alerte automatique
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-slate-600 dark:text-slate-300 mb-2 block">
                        Choisissez votre profil pour une analyse instantanée :
                      </label>
                      <select
                        value={userPreference}
                        onChange={(e) => handlePreferenceChange(e.target.value)}
                        disabled={!contractText || isLoading}
                        className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-2 text-sm text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">Sélectionnez votre profil...</option>
                        {userPreferences.map((pref, index) => (
                          <option key={index} value={pref.value}>
                            {pref.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {!contractText && (
                      <div className="bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/20 rounded-lg p-3">
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                          ⚠️ Collez d'abord un contrat dans le chat
                        </p>
                      </div>
                    )}
                    
                    {contractText && !userPreference && (
                      <div className="bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/20 rounded-lg p-3">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          💡 Sélectionnez un profil → Analyse automatique !
                        </p>
                      </div>
                    )}
                    
                    {contractText && userPreference && (
                      <div className="bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800/20 rounded-lg p-3">
                        <p className="text-sm text-green-700 dark:text-green-300">
                          ✅ Profil actif : {userPreferences.find(p => p.value === userPreference)?.label}
                        </p>
                      </div>
                    )}
                    
                    {isLoading && (
                      <div className="bg-cyan-100 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800/20 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-cyan-500 border-t-transparent"></div>
                          <p className="text-sm text-cyan-700 dark:text-cyan-300">
                            🚨 Génération de l'analyse personnalisée...
                          </p>
                        </div>
                      </div>
                    )}
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

                {/* Aide intelligente */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800/20">
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-emerald-600" />
                    IA Intelligente
                  </h3>
                  <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-medium">📋 Contrat complet</span>
                        <p className="text-xs">Utilise le résumé automatique</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-medium">🚨 Analyse personnalisée</span>
                        <p className="text-xs">Selon votre profil sélectionné</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-medium">💡 Question spécifique</span>
                        <p className="text-xs">Sur le contrat en contexte</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-medium">🤖 Chat général</span>
                        <p className="text-xs">Conversation intelligente</p>
                      </div>
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
                        <h3 className="font-semibold">Assistant IA Consent Radar</h3>
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
                          } rounded-2xl p-4 relative`}
                        >
                          {/* Indicateur de type d'analyse pour les messages IA */}
                          {msg.type === "ai" && msg.indicator && (
                            <div className="absolute -top-2 -left-2 bg-cyan-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                              {msg.indicator}
                            </div>
                          )}
                          
                          {msg.type === "ai" ? (
                            <div 
                              className="text-sm leading-relaxed"
                              dangerouslySetInnerHTML={{ 
                                __html: MessageFormatter.formatByType(msg.content, msg.analysisType) 
                              }}
                            />
                          ) : (
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                          )}
                          <p
                            className={`text-xs mt-2 ${msg.type === "user" ? "text-cyan-100" : "text-slate-500 dark:text-slate-400"}`}
                          >
                            {msg.timestamp}
                            {msg.analysisType && (
                              <span className="ml-2 opacity-50">• {msg.analysisType}</span>
                            )}
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