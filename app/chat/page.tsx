"use client"
import { motion, AnimatePresence } from "motion/react"
import { useState, useRef, useEffect } from "react"
import { Send, Upload, FileText, MessageCircle, AlertCircle, Brain, Trash2, Copy, Download, Home, ArrowLeft, Settings, Plus, Menu, X, Sparkles, Bot, User } from "lucide-react"
import axios from "axios"
import { MessageFormatter } from "@/lib/message-formatter"
import MessageRenderer from "@/components/message-renderer"
import "./modern-chat-styles.css"

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [contractText, setContractText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userPreference, setUserPreference] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [hoveredMessage, setHoveredMessage] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })
  const [messages, setMessages] = useState<Array<{
    type: string;
    content: string;
    timestamp: string;
    indicator?: string;
    analysisType?: string;
  }>>([
    {
      type: "ai",
      content: "👋 Bonjour ! Je suis **Consent Radar AI**, votre assistant intelligent pour l'analyse de contrats.\n\nJe peux vous aider à :\n• 📄 Analyser vos contrats et CGU\n• ⚠️ Identifier les risques potentiels\n• 📋 Créer des résumés clairs\n• 💬 Répondre à vos questions\n\nComment puis-je vous aider aujourd'hui ?",
      timestamp: new Date().toLocaleTimeString(),
      indicator: "🤖 Assistant IA"
    },
  ])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Initialiser côté client
  useEffect(() => {
    setIsClient(true)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Effet pour traiter les paramètres de l'extension
  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const source = urlParams.get('source');
      const title = urlParams.get('title');
      const content = urlParams.get('content');
      const url = urlParams.get('url');

      if (source === 'extension') {
        // Message de bienvenue de l'extension
        const welcomeMessage = {
          type: "ai",
          content: `🚀 **Analyse depuis l'extension ClairContrat !**

✅ J'ai détecté que vous venez de l'extension avec un contrat à analyser.

${title ? `📄 **Document détecté :** ${title}` : ''}
${url ? `🌐 **Source :** ${url}` : ''}

${content ? 
`**Voici un aperçu du contenu détecté :**
\`\`\`
${content.substring(0, 500)}${content.length > 500 ? '...' : ''}
\`\`\`

🤖 **Collez le contenu complet** dans le chat pour une analyse détaillée, ou utilisez les commandes suivantes :
- \`/resume\` - Pour un résumé rapide
- \`/points-cles\` - Pour extraire les points clés
- \`/risques\` - Pour identifier les risques potentiels` : 
'🤖 **Collez votre contrat** dans le chat pour commencer l\'analyse !'}`,
          timestamp: new Date().toLocaleTimeString(),
          indicator: "🚀 EXTENSION"
        };

        setMessages(prev => [...prev, welcomeMessage]);

        // Nettoyer l'URL après traitement
        window.history.replaceState({}, '', '/chat');
      }
    }
  }, [isClient]);

  // Composant de particules flottantes pour l'arrière-plan
  const FloatingParticles = () => {
    if (!isClient) return null;
    
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Particules principales */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            initial={{
              x: Math.random() * windowSize.width,
              y: windowSize.height + 100,
            }}
            animate={{
              x: Math.random() * windowSize.width,
              y: -100,
            }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 8,
          }}
        />
      ))}        {/* Particules géométriques */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`geo-${i}`}
            className="absolute w-2 h-2 border border-blue-400/20 rotate-45"
            initial={{
              x: Math.random() * windowSize.width,
              y: windowSize.height + 50,
              rotate: 0,
            }}
            animate={{
              x: Math.random() * windowSize.width,
              y: -50,
              rotate: 360,
            }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}        {/* Particules lumineuses */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`light-${i}`}
            className="absolute w-3 h-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-sm"
            initial={{
              x: Math.random() * windowSize.width,
              y: windowSize.height + 200,
              scale: 0.5,
            }}
            animate={{
              x: Math.random() * windowSize.width,
              y: -200,
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 25 + 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 12,
            }}
          />
        ))}
      </div>
    )
  }

  const quickQuestions = [
    "Résume-moi ce contrat",
    "Analyse personnalisée selon mon profil", 
    "Bonjour, comment ça marche ?",
    "Quels sont mes risques pour moi ?",
    "Comment puis-je résilier ?",
    "Explique-moi cette clause"
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

  // Gestion du scroll pour afficher/masquer le bouton "scroll to top"
  useEffect(() => {
    const chatContainer = chatContainerRef.current
    if (!chatContainer) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatContainer
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
      setShowScrollTop(!isNearBottom && scrollTop > 200)
    }

    chatContainer.addEventListener('scroll', handleScroll)
    return () => chatContainer.removeEventListener('scroll', handleScroll)
  }, [])

  // Fonction pour remonter en haut
  const scrollToTop = () => {
    chatContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Fonction pour coller un contrat
  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData("text")
    if (pastedText.length > 100) {
      setContractText(pastedText)
      setMessage(pastedText.substring(0, 500))
      e.preventDefault()
    }
  }

  // Fonction ULTRA-INTELLIGENTE pour déterminer quel endpoint utiliser
  const detectMessageType = (message: string) => {
    const lowerMessage = message.toLowerCase()
    
    // D'ABORD : Exclure "analyse ce contrat : [courte question]" (vont vers CHAT)
    const containsAnalyseContrat = lowerMessage.includes('analyse ce contrat :')
    const isShortMessage = message.length < 800
    
    if (containsAnalyseContrat && isShortMessage) {
      console.log('🔍 Détecté: "analyse ce contrat" + question courte → CHAT')
      return contractText ? 'contract_question' : 'general_chat'
    }
    
    // ENSUITE : Exclure les demandes d'explication/clarification (vont vers CHAT)
    const explanationKeywords = [
      'explique', 'explique en details', 'explique-moi', 'clarrifie', 'clarifie', 'que signifie', 'qu\'est-ce que', 'c\'est quoi',
      'que veut dire', 'ça veut dire quoi', 'comment comprendre', 'peux-tu expliquer',
      'détaille', 'détaille-moi', 'précise', 'éclaircis', 'éclairci', 'pourquoi'
    ]
    
    const hasExplanationRequest = explanationKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    )
    
    if (hasExplanationRequest) {
      return contractText ? 'contract_question' : 'general_chat'
    }
    
    // 1. SUMMARY : SEULEMENT pour résumé complet d'un NOUVEAU contrat
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
    
    const isVeryLongText = message.length > 2000
    const hasLegalStructure = /article|clause|section|alinéa|paragraphe/.test(lowerMessage)
    const hasMultipleClauses = (message.match(/\n/g) || []).length > 10
    
    // SUMMARY SEULEMENT si :
    if (hasExplicitSummaryRequest || 
        (isVeryLongText && hasContractKeywords && hasLegalStructure && hasMultipleClauses)) {
      return 'contract_analysis'
    }

    // 2. RISK-ALERT : Demandes d'analyse personnalisée avec profil
    const riskAnalysisKeywords = [
      'analyse personnalisée', 'selon mon profil', 'pour moi spécifiquement', 'adapté à mon profil',
      'risques pour moi', 'mes risques spécifiques', 'danger pour moi', 'préoccupant pour mon profil',
      'en tant que joueur', 'en tant que parent', 'en tant qu\'étudiant',
      'alerte personnalisée', 'risques selon mon profil', 'adapte à mon profil de'
    ]
    
    const hasRiskKeywords = riskAnalysisKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    )
    
    if (contractText && userPreference && hasRiskKeywords) {
      return 'risk_alert'
    }

    // 4. GENERAL_CHAT : Tout le reste
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
          console.log('📋 Résumé de contrat → Utilisation du SUMMARY')
          response = await axios.post('https://contract-backend-1riz.onrender.com/contract/summary', {
            contractText: currentMessage
          })
          aiResponse = response.data.summary
          setContractText(currentMessage)
          break

        case 'risk_alert':
          console.log('🚨 Analyse personnalisée → Utilisation du RISK-ALERT')
          if (!contractText || !userPreference) {
            aiResponse = "⚠️ Pour une analyse personnalisée, j'ai besoin d'un contrat et que vous sélectionniez votre profil dans la barre latérale."
          } else {
            response = await axios.post('https://contract-backend-1riz.onrender.com/contract/risk-alert', {
              contractText,
              userPreference,
              followUpQuestion: currentMessage
            })
            aiResponse = response.data.riskAlert
          }
          break

        case 'contract_question':
          console.log('💡 Question sur le contrat → Redirection vers CHAT')
          const chatHistoryForQuestion = messages.map(msg => ({
            type: msg.type,
            content: msg.content
          }))
          
          response = await axios.post('https://contract-backend-1riz.onrender.com/ai/chat', {
            message: currentMessage,
            conversationHistory: chatHistoryForQuestion,
            contractContext: contractText || null,
            userProfile: userPreference || null,
            messageType: 'contract_question'
          })
          
          aiResponse = response.data.response
          break

        case 'general_chat':
        default:
          console.log('🤖 Conversation générale → Utilisation du CHAT')
          const conversationHistory = messages.map(msg => ({
            type: msg.type,
            content: msg.content
          }))

          response = await axios.post('https://contract-backend-1riz.onrender.com/ai/chat', {
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
        indicator: "🤖 Assistant IA"
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
        indicator: undefined
      }
      
      setMessages(prev => [...prev, newUserMessage])

      try {
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
        const response = await axios.post('https://contract-backend-1riz.onrender.com/ai/chat', {
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

  // Afficher un loader pendant l'hydratation côté client
  if (!isClient) {
    return (
      <main className="min-h-screen relative bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-cyan-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative">
      <FloatingParticles />

      {/* Barre de navigation simplifiée en haut */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo/Retour */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Retour à l'accueil</span>
                <span className="sm:hidden">Accueil</span>
              </motion.button>
              
              <div className="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>
              
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <span className="font-bold text-slate-800 dark:text-white">Chat IA</span>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => window.location.href = '/historique'}
                className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-xs font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-3 h-3" />
                Historique
              </motion.button>
              
              <motion.button
                onClick={() => window.location.href = '/profil'}
                className="flex items-center gap-2 px-3 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-xs font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="w-3 h-3" />
                <span className="hidden sm:inline">Profil</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <section className="py-6 bg-white dark:bg-slate-900 pt-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  className="w-3 h-3 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Interface de Chat Active
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-3">
                Chat avec l'IA
              </h1>
              
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-4">
                Posez vos questions directement à notre IA spécialisée dans l'analyse de contrats numériques
              </p>
              
              {/* Badges d'information */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <motion.div
                  className="flex items-center gap-2 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200/50 dark:border-cyan-800/20 rounded-full px-4 py-2 text-sm font-medium text-cyan-700 dark:text-cyan-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <Brain className="w-4 h-4" />
                  IA Disponible
                </motion.div>
                
                <motion.div
                  className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/20 rounded-full px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <FileText className="w-4 h-4" />
                  Analyse Instantanée
                </motion.div>
                
                <motion.div
                  className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-200/50 dark:border-purple-800/20 rounded-full px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <AlertCircle className="w-4 h-4" />
                  Alertes Personnalisées
                </motion.div>
              </div>
            </motion.div>

            <div className="flex h-[750px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
              {/* Sidebar moderne style ChatGPT - Collée au chat */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-80 flex-shrink-0 border-r border-slate-200 dark:border-slate-700"
              >
                {/* Container principal de la sidebar */}
                <div className="h-full bg-slate-50 dark:bg-slate-800/50 flex flex-col">
                  
                  {/* Header de la sidebar */}
                  <div className="p-3 border-b border-slate-200/30 dark:border-slate-700/30">
                    <motion.button
                      onClick={clearConversation}
                      className="w-full flex items-center gap-3 p-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-all duration-200 group"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Plus className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-sm">New chat</span>
                    </motion.button>
                  </div>

                  {/* Zone de contenu scrollable */}
                  <div className="flex-1 overflow-y-auto scrollbar-hide p-3 space-y-3">
                    
                    {/* Section Import de fichier */}
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-slate-600 dark:text-slate-400 px-2">
                        Import
                      </div>
                      
                      {/* Drag & Drop simple */}
                      <motion.div 
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 rounded-lg p-3 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center gap-3">
                          <Upload className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              Upload file
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Drop PDF or paste text
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Section Profil utilisateur */}
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-slate-600 dark:text-slate-400 px-2">
                        Profile
                      </div>
                      
                      <div className="relative">
                        <select
                          value={userPreference}
                          onChange={(e) => handlePreferenceChange(e.target.value)}
                          disabled={!contractText || isLoading}
                          className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-2.5 text-sm text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-400 transition-all duration-200 appearance-none cursor-pointer"
                        >
                          <option value="">Select profile...</option>
                          {userPreferences.slice(1).map((pref, index) => (
                            <option key={index} value={pref.value}>
                              {pref.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <div className="w-1.5 h-1.5 border-r border-b border-slate-400 dark:border-slate-500 rotate-45"></div>
                        </div>
                      </div>

                      {/* Affichage du profil actuel */}
                      {userPreference && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-lg p-2.5"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span className="text-xs font-medium text-green-700 dark:text-green-300">
                              Active profile
                            </span>
                          </div>
                          <p className="text-xs text-green-600 dark:text-green-400 mt-1 truncate">
                            {userPreferences.find(p => p.value === userPreference)?.label}
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {/* Section Questions rapides */}
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-slate-600 dark:text-slate-400 px-2">
                        Examples
                      </div>
                      
                      <div className="space-y-1">
                        {quickQuestions.slice(0, 4).map((question, index) => (
                          <motion.button
                            key={index}
                            onClick={() => setMessage(question)}
                            className="w-full text-left p-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-200 group"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <p className="text-sm leading-relaxed">
                              {question}
                            </p>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Section État du contrat */}
                    {contractText && (
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-slate-600 dark:text-slate-400 px-2">
                          Document
                        </div>
                        
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-2.5"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                              Document loaded
                            </span>
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-400 space-y-0.5">
                            <div className="flex justify-between">
                              <span>Characters:</span>
                              <span className="font-mono">{contractText.length.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Words:</span>
                              <span className="font-mono">{contractText.split(/\s+/).length.toLocaleString()}</span>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Footer de la sidebar */}
                  <div className="p-3 border-t border-slate-200/30 dark:border-slate-700/30">
                    {/* Statistiques de session */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="text-center p-2 bg-white dark:bg-slate-800 rounded-lg">
                        <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          {messages.length}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Messages</div>
                      </div>
                      
                      <div className="text-center p-2 bg-white dark:bg-slate-800 rounded-lg">
                        <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          {contractText ? Math.round(contractText.length / 1000) : 0}K
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Characters</div>
                      </div>
                    </div>

                    {/* Bouton d'effacement */}
                    <motion.button
                      onClick={clearConversation}
                      className="w-full flex items-center justify-center gap-2 p-2 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Clear</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Interface de chat ultra-moderne - Collée à la sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 flex flex-col"
              >
                {/* Container principal sans bordure supplémentaire */}
                <div className="h-full flex flex-col">
                  
                  {/* Header épuré style ChatGPT */}
                  <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      {/* Avatar IA simple */}
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                          Consent Radar AI
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span>Online</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions header */}
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                        {messages.length} messages
                      </div>
                    </div>
                  </div>

                  {/* Zone de messages épurée */}
                  <div 
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto"
                  >
                    {/* Container des messages avec padding optimal */}
                    <div className="p-4 space-y-6">
                      {messages.map((msg, index) => (
                        <motion.div 
                          key={index} 
                          className={`flex items-start gap-3 ${msg.type === "user" ? "flex-row-reverse" : ""}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.05,
                          }}
                          onMouseEnter={() => setHoveredMessage(index)}
                          onMouseLeave={() => setHoveredMessage(null)}
                        >
                          {/* Avatar */}
                          <div className={`flex-shrink-0 ${msg.type === "user" ? "order-last" : ""}`}>
                            {msg.type === "ai" ? (
                              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                                <Brain className="w-4 h-4 text-white" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                              </div>
                            )}
                          </div>

                          {/* Message bubble moderne */}
                          <div className={`flex-1 ${msg.type === "user" ? "max-w-[80%]" : "max-w-[85%]"}`}>
                            {/* Indicateur du type de message */}
                            {msg.type === "ai" && msg.indicator && (
                              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
                                {msg.indicator.replace('🤖 ', '').replace('📋 ', '').replace('🚨 ', '').replace('💡 ', '').replace('🚀 ', '')}
                              </div>
                            )}
                            
                            <motion.div
                              className={`relative ${
                                msg.type === "user"
                                  ? "bg-cyan-500 text-white ml-auto"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                              } rounded-2xl px-4 py-3 shadow-sm`}
                              whileHover={{ 
                                scale: 1.005,
                                transition: { type: "spring", stiffness: 400 }
                              }}
                            >
                              {/* Contenu du message */}
                              <div className="text-sm leading-relaxed">
                                {msg.type === "ai" ? (
                                  <MessageRenderer 
                                    content={msg.content} 
                                    messageType={msg.analysisType}
                                  />
                                ) : (
                                  <MessageRenderer 
                                    content={msg.content} 
                                    messageType="user"
                                  />
                                )}
                              </div>
                              
                              {/* Timestamp et actions */}
                              <div className={`flex items-center justify-between mt-2 text-xs ${
                                msg.type === "user" ? "text-cyan-100" : "text-slate-500 dark:text-slate-400"
                              }`}>
                                <span>{msg.timestamp}</span>
                                
                                {/* Actions de message au survol */}
                                <div className={`flex items-center gap-1 transition-opacity duration-200 ${
                                  hoveredMessage === index ? 'opacity-100' : 'opacity-0'
                                }`}>
                                  <motion.button
                                    className={`p-1 rounded hover:${msg.type === "user" ? 'bg-cyan-600' : 'bg-slate-200 dark:bg-slate-700'} transition-colors`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => navigator.clipboard.writeText(msg.content)}
                                  >
                                    <Copy className="w-3 h-3" />
                                  </motion.button>
                                  
                                  {msg.type === "ai" && (
                                    <motion.button
                                      className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                    >
                                      <Download className="w-3 h-3" />
                                    </motion.button>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}

                      {/* Indicateur de chargement épuré */}
                      {isLoading && (
                        <motion.div 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          {/* Avatar IA */}
                          <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Brain className="w-4 h-4 text-white" />
                          </div>
                          
                          <div className="flex-1 max-w-[85%]">
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
                              Assistant IA
                            </div>
                            
                            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3 shadow-sm">
                              <div className="flex items-center gap-3">
                                {/* Animation de typing moderne */}
                                <div className="flex gap-1">
                                  {[0, 1, 2].map((i) => (
                                    <motion.div
                                      key={i}
                                      className="w-2 h-2 bg-slate-400 rounded-full"
                                      animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.5, 1, 0.5]
                                      }}
                                      transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                      }}
                                    />
                                  ))}
                                </div>
                                
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                  IA en train de réfléchir...
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Référence pour le scroll automatique */}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Zone de saisie style ChatGPT exact */}
                  <div className="p-4">
                    <div className="max-w-4xl mx-auto">
                      <div className="relative">
                        {/* Container principal de l'input - Style ChatGPT exact */}
                        <div className="relative bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-3xl shadow-sm focus-within:border-slate-400 dark:focus-within:border-slate-500 transition-colors">
                          {/* Bouton Plus à gauche */}
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                            <button className="w-8 h-8 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>

                          <textarea
                            ref={inputRef}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onPaste={handlePaste}
                            onKeyPress={(e) => {
                              if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                                e.preventDefault()
                                handleSendMessage()
                              }
                            }}
                            disabled={isLoading}
                            placeholder="Ask anything"
                            rows={1}
                            className="w-full bg-transparent border-0 resize-none pl-14 pr-20 py-4 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none disabled:opacity-50 max-h-52 min-h-[56px]"
                            style={{
                              height: 'auto',
                              minHeight: '56px',
                              maxHeight: '200px',
                              resize: 'none',
                              fontSize: '16px',
                              lineHeight: '24px'
                            }}
                            onInput={(e) => {
                              const target = e.target as HTMLTextAreaElement;
                              target.style.height = 'auto';
                              target.style.height = Math.min(target.scrollHeight, 200) + 'px';
                            }}
                          />
                          
                          {/* Boutons à droite - Micro et Envoi */}
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                            {/* Bouton Micro */}
                            <button className="w-8 h-8 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z" fill="currentColor"/>
                                <path d="M19 10V12C19 16.42 15.42 20 11 20H13C17.42 20 21 16.42 21 12V10H19Z" fill="currentColor"/>
                                <path d="M5 10V12C5 16.42 8.58 20 13 20H11C6.58 20 3 16.42 3 12V10H5Z" fill="currentColor"/>
                                <path d="M12 22V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M8 22H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                            </button>

                            {/* Bouton d'envoi style ChatGPT */}
                            <motion.button
                              onClick={handleSendMessage}
                              disabled={!message.trim() || isLoading}
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                                message.trim() && !isLoading
                                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
                                  : 'bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                              }`}
                              whileHover={message.trim() && !isLoading ? { scale: 1.05 } : {}}
                              whileTap={message.trim() && !isLoading ? { scale: 0.95 } : {}}
                            >
                              {isLoading ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                                />
                              ) : (
                                <svg 
                                  width="16" 
                                  height="16" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  className="transform rotate-90"
                                >
                                  <path 
                                    d="M7 11L12 6L17 11M12 18V7" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </motion.button>
                          </div>
                        </div>
                        
                        {/* Compteur de caractères subtil */}
                        {message.length > 0 && (
                          <div className="absolute -bottom-6 right-0 text-xs text-slate-400 dark:text-slate-500">
                            {message.length}
                          </div>
                        )}
                      </div>

                      {/* Suggestions sous le champ */}
                      {!isLoading && message.length === 0 && (
                        <div className="mt-3 flex flex-wrap gap-2 justify-center">
                          {[
                            { text: "📋 Analyser un contrat", action: "Résume-moi ce contrat en détail" },
                            { text: "❓ Poser une question", action: "Bonjour, comment ça marche ?" },
                            { text: "🎯 Analyse personnalisée", action: "Analyse personnalisée selon mon profil" }
                          ].map((suggestion, index) => (
                            <motion.button
                              key={index}
                              onClick={() => setMessage(suggestion.action)}
                              className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200 font-medium"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + index * 0.05 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {suggestion.text}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bouton de scroll vers le haut */}
                {showScrollTop && (
                  <motion.button
                    className="fixed bottom-32 right-8 w-10 h-10 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full shadow-lg z-50 flex items-center justify-center"
                    onClick={scrollToTop}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="w-3 h-3 border-l-2 border-t-2 border-white transform rotate-45 -translate-y-0.5"></div>
                  </motion.button>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Bouton d'aide flottant */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={() => {
            const helpMessage = `🎯 **Guide rapide :**

**Pour analyser un contrat :**
• Collez le texte dans la zone de chat
• Ou utilisez "Résume-moi ce contrat"

**Pour une analyse personnalisée :**
• Sélectionnez votre profil dans la barre latérale
• L'analyse s'adaptera automatiquement !

**Navigation :**
• ← Retour à l'accueil : bouton en haut à gauche
• Historique et Profil : en haut à droite

**Besoin d'aide ?** Tapez simplement "Comment ça marche ?" 😊`
            
            setMessages(prev => [...prev, {
              type: "ai",
              content: helpMessage,
              timestamp: new Date().toLocaleTimeString(),
              indicator: "💡 AIDE"
            }])
          }}
          className="group bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white dark:border-slate-800"
          whileHover={{ 
            scale: 1.1, 
            rotate: 5,
            boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)"
          }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ 
              y: [0, -2, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <span className="text-xl">💡</span>
          </motion.div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-slate-800 dark:bg-white text-white dark:text-slate-800 text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
              Guide d'utilisation
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800 dark:border-t-white"></div>
            </div>
          </div>
        </motion.button>
      </motion.div>

      {/* Bouton de raccourci pour nouvelle conversation */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={() => {
            clearConversation()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white dark:border-slate-800"
          whileHover={{ 
            scale: 1.1, 
            rotate: -5,
            boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)"
          }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <span className="text-xl">🔄</span>
          </motion.div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-slate-800 dark:bg-white text-white dark:text-slate-800 text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
              Nouvelle conversation
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800 dark:border-t-white"></div>
            </div>
          </div>
        </motion.button>
      </motion.div>

      {/* Notification contextuelle pour les nouveaux utilisateurs */}
      {messages.length <= 1 && (
        <motion.div
          className="fixed top-24 right-6 z-40 max-w-sm"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 3, type: "spring", stiffness: 200 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
        >
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200/50 dark:border-cyan-800/20 rounded-2xl p-4 shadow-xl backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-sm">👋</span>
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-cyan-800 dark:text-cyan-300 text-sm mb-1">
                  Bienvenue dans Chat IA !
                </h4>
                <p className="text-xs text-cyan-700 dark:text-cyan-400">
                  Collez un contrat ou posez une question pour commencer. 
                  Cliquez sur 💡 pour plus d'aide.
                </p>
              </div>
              <motion.button
                onClick={() => {
                  const notification = document.querySelector('[data-notification]')
                  if (notification) notification.remove()
                }}
                className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-200 p-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Fermer</span>
                ✕
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </main>
  )
}