"use client"
import { motion, AnimatePresence } from "motion/react"
import { useState, useRef, useEffect } from "react"
import { Send, Upload, FileText, MessageCircle, AlertCircle, Brain, Trash2, Copy, Download, Home, ArrowLeft, Settings, Moon, Sun, Mic, MicOff, Paperclip, Smile, MoreVertical, Search, Filter, ChevronDown, Zap, Sparkles, Eye, EyeOff, Volume2, VolumeX } from "lucide-react"
import axios from "axios"
import { MessageFormatter } from "@/lib/message-formatter"
import MessageRenderer from "@/components/message-renderer"
import './modern-chat.css'

export default function ModernChatPage() {
  const [message, setMessage] = useState("")
  const [contractText, setContractText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userPreference, setUserPreference] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [hoveredMessage, setHoveredMessage] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [aiStatus, setAiStatus] = useState<'online' | 'typing' | 'processing'>('online')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [messages, setMessages] = useState<Array<{
    type: string;
    content: string;
    timestamp: string;
    indicator?: string;
    analysisType?: string;
    id: number;
    status?: 'sending' | 'sent' | 'delivered' | 'read';
  }>>([
    {
      id: 1,
      type: "ai",
      content: `🎉 **Bienvenue dans Consent Radar Chat !**

Je suis votre assistant IA spécialisé dans l'analyse de contrats numériques. Voici ce que je peux faire pour vous :

**🔍 Analyse instantanée :**
• Collez n'importe quel contrat → Résumé automatique
• Questions spécifiques → Réponses précises
• Identification des clauses importantes

**🎯 Analyse personnalisée :**
• Sélectionnez votre profil utilisateur
• Alertes adaptées à vos besoins
• Recommandations sur-mesure

**💡 Pour commencer :**
1. Tapez votre question ou collez un contrat
2. Ou utilisez les boutons de suggestion ci-dessous
3. Sélectionnez votre profil pour une analyse personnalisée

**Essayez :** "Comment ça marche ?" ou collez un contrat ! 🚀`,
      timestamp: new Date().toLocaleTimeString(),
      indicator: "🤖 ASSISTANT IA",
      status: 'delivered'
    },
  ])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const quickSuggestions = [
    { emoji: "📋", text: "Résume-moi ce contrat", category: "Analyse" },
    { emoji: "🤔", text: "Comment ça marche ?", category: "Aide" },
    { emoji: "🚨", text: "Analyse personnalisée selon mon profil", category: "Risques" },
    { emoji: "📖", text: "Explique-moi cette clause", category: "Questions" },
    { emoji: "⚖️", text: "Mes droits dans ce contrat", category: "Légal" },
    { emoji: "🔄", text: "Comment résilier ce contrat ?", category: "Actions" }
  ]

  const userProfiles = [
    { value: "", label: "✨ Sélectionnez votre profil", color: "gray" },
    { value: "football_fan", label: "⚽ Passionné de Football", color: "green" },
    { value: "basketball_fan", label: "🏀 Fan de Basketball", color: "orange" },
    { value: "anime_lover", label: "🎌 Amateur d'Anime", color: "pink" },
    { value: "gamer", label: "🎮 Joueur/Gameuse", color: "purple" },
    { value: "music_lover", label: "🎵 Mélomane", color: "blue" },
    { value: "movie_buff", label: "🎬 Cinéphile", color: "red" },
    { value: "tech_enthusiast", label: "💻 Passionné de Tech", color: "cyan" },
    { value: "social_media_user", label: "📱 Utilisateur de Réseaux Sociaux", color: "indigo" },
    { value: "student", label: "🎓 Étudiant(e)", color: "yellow" },
    { value: "parent", label: "👨‍👩‍👧‍👦 Parent", color: "emerald" }
  ]

  // Initialisation côté client
  useEffect(() => {
    setIsClient(true)
    
    // Charger les préférences depuis localStorage
    const savedTheme = localStorage.getItem('theme')
    const savedSound = localStorage.getItem('soundEnabled')
    const savedProfile = localStorage.getItem('userProfile')
    
    setDarkMode(savedTheme === 'dark')
    setSoundEnabled(savedSound !== 'false')
    setUserPreference(savedProfile || '')
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Gestion du thème
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Auto-scroll vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Gestion du scroll pour le bouton "scroll to top"
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

  const scrollToTop = () => {
    chatContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Fonction pour détecter le type de message
  const detectMessageType = (message: string) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('résume') || lowerMessage.includes('résumé') || 
        (message.length > 1500 && lowerMessage.includes('contrat'))) {
      return 'contract_analysis'
    }
    
    if (contractText && userPreference && 
        (lowerMessage.includes('personnalisé') || lowerMessage.includes('selon mon profil'))) {
      return 'risk_alert'
    }
    
    return 'general_chat'
  }

  // Fonction principale pour envoyer un message
  const handleSendMessage = async () => {
    if (!message.trim()) return
    
    const currentMessage = message
    const messageId = Date.now()
    setMessage("")
    setIsLoading(true)
    setAiStatus('processing')
    
    // Ajouter le message utilisateur
    const newUserMessage = {
      id: messageId,
      type: "user",
      content: currentMessage,
      timestamp: new Date().toLocaleTimeString(),
      status: 'sending' as const
    }
    
    setMessages(prev => [...prev, newUserMessage])

    // Jouer son d'envoi si activé
    if (soundEnabled) {
      try {
        new Audio('/sounds/send.mp3').play().catch(() => {})
      } catch {}
    }

    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, status: 'sent' as const } : msg
      ))
    }, 500)

    try {
      const messageType = detectMessageType(currentMessage)
      let response
      let aiResponse = ""

      switch (messageType) {
        case 'contract_analysis':
          response = await axios.post('https://contract-backend-1riz.onrender.com/contract/summary', {
            contractText: currentMessage
          })
          aiResponse = response.data.summary
          setContractText(currentMessage)
          break

        case 'risk_alert':
          if (!contractText || !userPreference) {
            aiResponse = "⚠️ Pour une analyse personnalisée, j'ai besoin d'un contrat et que vous sélectionniez votre profil."
          } else {
            response = await axios.post('https://contract-backend-1riz.onrender.com/contract/risk-alert', {
              contractText,
              userPreference,
              followUpQuestion: currentMessage
            })
            aiResponse = response.data.riskAlert
          }
          break

        case 'general_chat':
        default:
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
      
      const typeIndicators = {
        'contract_analysis': '📋 ANALYSE CONTRAT',
        'risk_alert': '🚨 ALERTE PERSONNALISÉE',
        'general_chat': '🤖 CONVERSATION'
      }
      
      const newAIMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString(),
        analysisType: messageType,
        indicator: typeIndicators[messageType],
        status: 'delivered' as const
      }
      
      setMessages(prev => [...prev, newAIMessage])

      // Jouer son de réception si activé
      if (soundEnabled) {
        try {
          new Audio('/sounds/receive.mp3').play().catch(() => {})
        } catch {}
      }
      
    } catch (error: any) {
      console.error('Erreur Chat API:', error)
      const errorMessage = {
        id: Date.now() + 2,
        type: "ai" as const,
        content: "❌ Désolé, une erreur s'est produite. Vérifiez que le backend est démarré.\n\n🔧 **Détails :** " + (error.response?.data?.error || error.message),
        timestamp: new Date().toLocaleTimeString(),
        indicator: "❌ ERREUR",
        status: 'delivered' as const
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setAiStatus('online')
    }
  }

  // Fonction pour effacer la conversation
  const clearConversation = () => {
    setMessages([{
      id: Date.now(),
      type: "ai",
      content: "🔄 **Nouvelle conversation !**\n\nComment puis-je vous aider aujourd'hui ?",
      timestamp: new Date().toLocaleTimeString(),
      indicator: "🤖 ASSISTANT IA",
      status: 'delivered'
    }])
    setContractText("")
  }

  // Gestion du changement de profil utilisateur
  const handleProfileChange = (newProfile: string) => {
    setUserPreference(newProfile)
    localStorage.setItem('userProfile', newProfile)
    
    if (contractText && newProfile) {
      // Générer automatiquement une alerte personnalisée
      const profileLabel = userProfiles.find(p => p.value === newProfile)?.label
      setMessage(`Analyse personnalisée selon mon profil ${profileLabel}`)
    }
  }

  // Fonction pour coller du contenu
  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData("text")
    if (pastedText.length > 100) {
      setContractText(pastedText)
    }
  }

  if (!isClient) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-cyan-900/20 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600 dark:text-gray-400 font-medium">Chargement de l'interface...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-cyan-900/20 transition-all duration-500">
      {/* Effets de fond animés */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Particules flottantes */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: -100,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
        
        {/* Gradients dynamiques */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-300/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Barre de navigation supérieure */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/20"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo et navigation */}
            <div className="flex items-center gap-6">
              <motion.button
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Accueil</span>
              </motion.button>
              
              <div className="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>
              
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg"
                  animate={{ 
                    boxShadow: ["0 4px 20px rgba(6, 182, 212, 0.3)", "0 4px 30px rgba(6, 182, 212, 0.5)", "0 4px 20px rgba(6, 182, 212, 0.3)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Brain className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h1 className="font-bold text-xl text-slate-800 dark:text-white">Chat IA</h1>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className={`w-2 h-2 rounded-full ${
                      aiStatus === 'online' ? 'bg-emerald-500 animate-pulse' :
                      aiStatus === 'typing' ? 'bg-yellow-500 animate-pulse' :
                      'bg-blue-500 animate-pulse'
                    }`}></div>
                    <span>
                      {aiStatus === 'online' ? 'En ligne' :
                       aiStatus === 'typing' ? 'En train d\'écrire...' :
                       'Traitement en cours...'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contrôles */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </motion.button>
              
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.button>
              
              <motion.button
                onClick={() => window.location.href = '/profil'}
                className="p-2 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Settings className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Interface principale */}
      <div className="pt-20 pb-6 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-5 gap-6 h-[calc(100vh-7rem)]">
            
            {/* Barre latérale moderne */}
            <motion.aside
              className={`lg:col-span-1 transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-full'}`}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4 h-full overflow-y-auto pr-2">
                
                {/* Statistiques de session */}
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-3xl blur-xl"></div>
                  <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-3xl p-4 shadow-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-slate-800 dark:text-white">📊 Session</h3>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-slate-600 dark:text-slate-400">Active</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-center p-2 bg-white/40 dark:bg-slate-700/40 rounded-xl">
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{messages.length}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Messages</div>
                      </div>
                      <div className="text-center p-2 bg-white/40 dark:bg-slate-700/40 rounded-xl">
                        <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                          {contractText ? Math.round(contractText.length / 1000) : 0}K
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Caractères</div>
                      </div>
                    </div>
                    
                    {userPreference && (
                      <motion.div 
                        className="mt-3 p-2 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-xl border border-emerald-300/30"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                            <span className="text-xs">🎯</span>
                          </div>
                          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 truncate">
                            {userProfiles.find(p => p.value === userPreference)?.label}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Sélection de profil */}
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-3xl blur-xl"></div>
                  <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-3xl p-4 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-800 dark:text-white">Profil utilisateur</h3>
                    </div>
                    
                    <select
                      value={userPreference}
                      onChange={(e) => handleProfileChange(e.target.value)}
                      className="w-full bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border-2 border-slate-200/50 dark:border-slate-600/50 rounded-2xl p-3 text-sm font-medium text-slate-700 dark:text-slate-300 focus:border-cyan-400 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/20 dark:focus:ring-cyan-800/20 transition-all duration-300 appearance-none cursor-pointer"
                    >
                      {userProfiles.map((profile, index) => (
                        <option key={index} value={profile.value}>
                          {profile.label}
                        </option>
                      ))}
                    </select>
                    
                    {!contractText && userPreference && (
                      <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/20 rounded-xl">
                        <p className="text-xs text-amber-700 dark:text-amber-400">
                          💡 Importez un contrat pour une analyse personnalisée !
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Import de document */}
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-3xl blur-xl"></div>
                  <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-3xl p-4 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                        <Upload className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-800 dark:text-white">Import contrat</h3>
                    </div>
                    
                    <motion.button 
                      className="w-full bg-white dark:bg-slate-700/50 border-2 border-dashed border-purple-300 dark:border-purple-500/50 rounded-2xl p-6 text-center hover:border-purple-400 dark:hover:border-purple-400 transition-all duration-300 group/drop"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FileText className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      </motion.div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Glissez un fichier ici
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        PDF, TXT, DOC
                      </p>
                    </motion.button>
                    
                    <motion.button 
                      className="w-full mt-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl py-3 text-sm font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Paperclip className="w-4 h-4" />
                        Ou coller du texte
                      </span>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Actions rapides */}
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-600/20 rounded-3xl blur-xl"></div>
                  <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-3xl p-4 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-800 dark:text-white">Actions rapides</h3>
                    </div>
                    
                    <div className="space-y-2">
                      <motion.button
                        onClick={clearConversation}
                        className="w-full bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 hover:from-red-100 hover:to-rose-100 dark:hover:from-red-900/30 dark:hover:to-rose-900/30 text-red-700 dark:text-red-400 rounded-xl py-3 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Nouvelle conversation
                      </motion.button>
                      
                      {contractText && (
                        <motion.div 
                          className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200/50 dark:border-emerald-800/20 rounded-xl p-3"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                              Contrat chargé
                            </p>
                          </div>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400">
                            {contractText.length.toLocaleString()} caractères
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.aside>

            {/* Zone de chat principale */}
            <motion.div
              className="lg:col-span-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-full">
                {/* Halo lumineux */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-3xl blur-2xl"></div>
                
                {/* Interface principale */}
                <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl border border-white/30 dark:border-slate-700/30 rounded-3xl shadow-2xl h-full flex flex-col overflow-hidden">
                  
                  {/* En-tête du chat */}
                  <div className="relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white p-6 rounded-t-3xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <motion.div 
                          className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30"
                          animate={{ 
                            boxShadow: ["0 0 20px rgba(255,255,255,0.2)", "0 0 30px rgba(255,255,255,0.4)", "0 0 20px rgba(255,255,255,0.2)"]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <Brain className="w-6 h-6 text-white" />
                        </motion.div>
                        
                        <div>
                          <h2 className="font-bold text-xl">Consent Radar AI</h2>
                          <div className="flex items-center gap-2 text-sm text-cyan-100">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                            <span>Spécialisé en contrats numériques</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl px-3 py-1 text-xs font-medium">
                          <span className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                            IA Active
                          </span>
                        </div>
                        {contractText && (
                          <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl px-3 py-1 text-xs font-medium">
                            <span className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              Contrat chargé
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Zone des messages */}
                  <div 
                    ref={chatContainerRef}
                    className="flex-1 p-6 overflow-y-auto space-y-6 relative"
                  >
                    {/* Pattern de fond subtil */}
                    <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(148,163,184) 1px, transparent 0)',
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>
                    
                    <AnimatePresence>
                      {messages.map((msg, index) => (
                        <motion.div 
                          key={msg.id} 
                          className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{ 
                            duration: 0.4,
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                          }}
                          onMouseEnter={() => setHoveredMessage(index)}
                          onMouseLeave={() => setHoveredMessage(null)}
                        >
                          <div className={`relative max-w-[80%] ${msg.type === "user" ? "ml-auto" : "mr-auto"}`}>
                            {/* Bulle de message moderne */}
                            <motion.div
                              className={`relative ${
                                msg.type === "user"
                                  ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                                  : "bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 text-slate-800 dark:text-slate-200 shadow-xl"
                              } rounded-3xl p-5 overflow-hidden group/message`}
                              whileHover={{ 
                                scale: 1.02,
                                y: -2,
                              }}
                            >
                              {/* Effet brillant au survol */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/message:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
                              
                              {/* Avatar pour les messages IA */}
                              {msg.type === "ai" && (
                                <motion.div 
                                  className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-800"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.3, type: "spring" }}
                                >
                                  <Brain className="w-4 h-4 text-white" />
                                </motion.div>
                              )}
                              
                              {/* Indicateur de type */}
                              {msg.type === "ai" && msg.indicator && (
                                <motion.div 
                                  className="inline-block px-2 py-1 mb-3 text-xs font-bold rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-300/30 text-cyan-700 dark:text-cyan-300"
                                  initial={{ scale: 0, rotate: -10 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ delay: 0.2, type: "spring" }}
                                >
                                  {msg.indicator}
                                </motion.div>
                              )}
                              
                              {/* Contenu du message */}
                              <div className={`${msg.type === "ai" ? "ml-4" : ""} relative z-10`}>
                                <div className="text-sm leading-relaxed">
                                  <MessageRenderer 
                                    content={msg.content} 
                                    messageType={msg.analysisType || msg.type}
                                  />
                                </div>
                                
                                {/* Métadonnées */}
                                <div className={`flex items-center justify-between mt-3 text-xs ${
                                  msg.type === "user" ? "text-cyan-100" : "text-slate-500 dark:text-slate-400"
                                }`}>
                                  <span className="flex items-center gap-2">
                                    <div className={`w-1 h-1 rounded-full ${
                                      msg.status === 'sending' ? 'bg-yellow-500 animate-pulse' :
                                      msg.status === 'sent' ? 'bg-blue-500' :
                                      msg.status === 'delivered' ? 'bg-emerald-500' :
                                      'bg-current'
                                    }`}></div>
                                    {msg.timestamp}
                                    {msg.status && (
                                      <span className="opacity-70">
                                        • {msg.status === 'sending' ? 'Envoi...' : 
                                           msg.status === 'sent' ? 'Envoyé' : 
                                           msg.status === 'delivered' ? 'Livré' : 'Lu'}
                                      </span>
                                    )}
                                  </span>
                                  
                                  {/* Actions au survol */}
                                  <div className={`flex items-center gap-1 ${
                                    hoveredMessage === index ? 'opacity-100' : 'opacity-0'
                                  } transition-all duration-300`}>
                                    <motion.button
                                      className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                                      whileHover={{ scale: 1.2 }}
                                      whileTap={{ scale: 0.8 }}
                                      onClick={() => navigator.clipboard.writeText(msg.content)}
                                    >
                                      <Copy className="w-3 h-3" />
                                    </motion.button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Indicateur de chargement */}
                    {isLoading && (
                      <motion.div 
                        className="flex justify-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="relative">
                          <div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-800">
                            <Brain className="w-4 h-4 text-white" />
                          </div>
                          
                          <div className="ml-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-3xl p-5 shadow-xl">
                            <div className="flex items-center gap-3">
                              <div className="flex space-x-1">
                                {[0, 1, 2].map((i) => (
                                  <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-cyan-500 rounded-full"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{
                                      duration: 0.6,
                                      repeat: Infinity,
                                      delay: i * 0.1
                                    }}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                L'IA analyse votre message...
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Zone de saisie moderne */}
                  <div className="relative p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border-t border-white/20 dark:border-slate-700/20">
                    {/* Suggestions rapides */}
                    {!isLoading && message.length === 0 && (
                      <motion.div 
                        className="mb-4 flex flex-wrap gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {quickSuggestions.map((suggestion, index) => (
                          <motion.button
                            key={index}
                            onClick={() => setMessage(suggestion.text)}
                            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200/50 dark:border-cyan-800/20 rounded-xl text-cyan-700 dark:text-cyan-300 text-xs font-medium hover:scale-105 transition-all duration-200"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <span>{suggestion.emoji}</span>
                            {suggestion.text}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                    
                    <div className="flex items-end gap-4">
                      {/* Zone de saisie */}
                      <div className="flex-1 relative">
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
                          placeholder="💬 Posez votre question ou collez un contrat... (Shift+Enter pour nouvelle ligne)"
                          rows={Math.min(Math.max(message.split('\n').length, 1), 4)}
                          className="w-full bg-white/80 dark:bg-slate-700/80 backdrop-blur-xl border-2 border-slate-200/50 dark:border-slate-600/50 rounded-2xl px-5 py-4 pr-20 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-400 focus:ring-4 focus:ring-cyan-200/20 dark:focus:ring-cyan-800/20 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50 transition-all duration-300 resize-none min-h-[60px] max-h-32 shadow-lg font-medium text-sm leading-relaxed"
                        />
                        
                        {/* Compteur de caractères */}
                        {message.length > 0 && (
                          <motion.div
                            className="absolute bottom-2 right-16 text-xs text-slate-400 dark:text-slate-500"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                          >
                            <span className={`px-2 py-1 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm ${
                              message.length > 5000 ? 'text-red-500' : 'text-slate-500'
                            }`}>
                              {message.length.toLocaleString()}
                            </span>
                          </motion.div>
                        )}
                      </div>

                      {/* Boutons d'actions */}
                      <div className="flex items-center gap-2">
                        <motion.button
                          className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Paperclip className="w-4 h-4" />
                        </motion.button>
                        
                        <motion.button
                          onClick={() => setIsRecording(!isRecording)}
                          className={`p-3 rounded-xl backdrop-blur-sm border transition-colors ${
                            isRecording 
                              ? 'bg-red-500 border-red-600 text-white' 
                              : 'bg-white/60 dark:bg-slate-800/60 border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </motion.button>
                        
                        {/* Bouton d'envoi */}
                        <motion.button
                          onClick={handleSendMessage}
                          disabled={!message.trim() || isLoading}
                          className="relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)"
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
                          
                          <div className="relative">
                            {isLoading ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              />
                            ) : (
                              <Send className="w-5 h-5" />
                            )}
                          </div>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bouton de scroll vers le haut */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-6 right-20 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full shadow-xl z-50 flex items-center justify-center"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-4 h-4 border-l-2 border-t-2 border-white transform rotate-45 -translate-y-0.5"></div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Styles CSS intégrés pour les animations */}
      <style jsx>{`
        @keyframes typing {
          0%, 60% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }
        
        .typing-dot {
          width: 8px;
          height: 8px;
          background: #06b6d4;
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }
        
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        
        .message-bubble {
          position: relative;
          backdrop-filter: blur(20px);
        }
        
        .message-bubble::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(45deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3));
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
        }
        
        .avatar-breathing {
          animation: breathe 3s ease-in-out infinite;
        }
        
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .neon-glow {
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
        }
        
        .shimmer {
          background: linear-gradient(90deg, 
            rgba(255,255,255,0) 0%, 
            rgba(255,255,255,0.4) 50%, 
            rgba(255,255,255,0) 100%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .status-pulse {
          animation: statusPulse 2s infinite;
        }
        
        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </main>
  )
}
