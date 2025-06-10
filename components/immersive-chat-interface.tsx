"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { 
  Send, 
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Trash2,
  Copy,
  FileText,
  Brain,
  Sparkles,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  User,
  MessageCircle,
  Menu,
  X,
  Settings,
  Clock,
  ChevronDown,
  PaperPlaneIcon,
  Upload,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Zap
} from "lucide-react"
import axios from "axios"

export interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: string;
  indicator?: string;
  analysisType?: string;
  isPlaying?: boolean;
}

export interface ChatInterfaceProps {
  initialMessages?: ChatMessage[];
  onSendMessage?: (message: string) => Promise<any>;
  contractText?: string;
  setContractText?: (text: string) => void;
  userPreference?: string;
  setUserPreference?: (preference: string) => void;
}

export default function ImmersiveChatInterface({
  initialMessages = [],
  onSendMessage,
  contractText = "",
  setContractText,
  userPreference = "",
  setUserPreference
}: ChatInterfaceProps) {
  // États
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [currentSpeech, setCurrentSpeech] = useState<SpeechSynthesisUtterance | null>(null)
  const [recognition, setRecognition] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<'contract' | 'profile' | 'chat' | 'settings'>('chat')
  const [animation, setAnimation] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages.length > 0 
    ? initialMessages 
    : [
      {
        id: crypto.randomUUID(),
        type: "ai",
        content: "👋 **Bienvenue sur ClairContrat AI !** \n\nJe suis votre assistant intelligent pour l'analyse de contrats. \n\n✨ **Fonctionnalités :**\n• 📋 Analyse automatique de contrats\n• 🚨 Analyses personnalisées selon votre profil\n• 💡 Réponses à vos questions spécifiques\n• 🎤 Support vocal intégré\n• 🔊 Lecture automatique des réponses\n\n*Comment puis-je vous aider aujourd'hui ?*",
        timestamp: new Date().toLocaleTimeString(),
        indicator: "🤖 ASSISTANT IA",
        isPlaying: false
      },
    ])
  
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Initialiser la reconnaissance vocale
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      const speechRecognition = new SpeechRecognition()
      speechRecognition.continuous = false
      speechRecognition.interimResults = false
      speechRecognition.lang = 'fr-FR'
      
      speechRecognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setMessage(transcript)
        setIsListening(false)
        
        // Animation pulsation sur la réception de texte vocal
        setAnimation(true)
        setTimeout(() => setAnimation(false), 1000)
      }
      
      speechRecognition.onerror = () => {
        setIsListening(false)
        toast({
          title: "Erreur de reconnaissance vocale",
          description: "Impossible de comprendre. Veuillez réessayer.",
          variant: "destructive",
          duration: 3000,
        })
      }
      
      speechRecognition.onend = () => {
        setIsListening(false)
      }
      
      setRecognition(speechRecognition)
    }
  }, [toast])

  // Fonction pour adapter la hauteur du textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }, [message])

  // Fonction de synthèse vocale
  const speakText = (text: string, messageId: string) => {
    if (!voiceEnabled) return
    
    // Arrêter la lecture en cours
    if (currentSpeech) {
      window.speechSynthesis.cancel()
      setCurrentSpeech(null)
      setIsSpeaking(false)
      setMessages(prev => prev.map(msg => ({ ...msg, isPlaying: false })))
    }
    
    // Nettoyer le texte pour la synthèse vocale
    const cleanText = text
      .replace(/[#*_`~]/g, '') // Enlever markdown
      .replace(/\n+/g, '. ') // Remplacer saut de ligne par pause
      .replace(/[📋🚨💡🤖⚽🏀🎌🎮🎵🎬💻📱🎓👨‍👩‍👧‍👦✨🔊🎤]/g, '') // Enlever emojis
    
    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.lang = 'fr-FR'
    utterance.rate = 0.95
    utterance.pitch = 1.0
    utterance.volume = 0.9
    
    utterance.onstart = () => {
      setIsSpeaking(true)
      setCurrentSpeech(utterance)
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, isPlaying: true } : { ...msg, isPlaying: false }
      ))
      
      toast({
        title: "Lecture vocale activée",
        description: "L'assistant lit le message à voix haute",
        duration: 2000,
      })
    }
    
    utterance.onend = () => {
      setIsSpeaking(false)
      setCurrentSpeech(null)
      setMessages(prev => prev.map(msg => ({ ...msg, isPlaying: false })))
    }
    
    utterance.onerror = () => {
      setIsSpeaking(false)
      setCurrentSpeech(null)
      setMessages(prev => prev.map(msg => ({ ...msg, isPlaying: false })))
      
      toast({
        title: "Erreur de lecture vocale",
        description: "Impossible de lire le message à voix haute",
        variant: "destructive",
        duration: 3000,
      })
    }
    
    window.speechSynthesis.speak(utterance)
  }

  // Arrêter la lecture vocale
  const stopSpeaking = () => {
    if (currentSpeech) {
      window.speechSynthesis.cancel()
      setCurrentSpeech(null)
      setIsSpeaking(false)
      setMessages(prev => prev.map(msg => ({ ...msg, isPlaying: false })))
      
      toast({
        title: "Lecture vocale arrêtée",
        description: "L'assistant a cessé de parler",
        duration: 2000,
      })
    }
  }

  // Démarrer/arrêter la reconnaissance vocale
  const toggleListening = () => {
    if (!recognition) return
    
    if (isListening) {
      recognition.stop()
      setIsListening(false)
      
      toast({
        title: "Microphone désactivé",
        description: "Mode d'écoute terminé",
        duration: 2000,
      })
    } else {
      recognition.start()
      setIsListening(true)
      
      toast({
        title: "Microphone activé",
        description: "L'assistant vous écoute...",
        duration: 2000,
      })
    }
  }

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
  
  // Fonction pour gérer l'affichage responsive
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    // Définir l'état initial
    handleResize()

    // Ajouter l'écouteur d'événement
    window.addEventListener('resize', handleResize)
    
    // Nettoyer l'écouteur d'événement
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Questions rapides
  const quickQuestions = [
    "Bonjour, comment ça marche ?",
    "Résume-moi ce contrat simplement",
    "Analyse personnalisée selon mon profil",
    "Quels sont mes risques pour moi ?",
    "Comment puis-je résilier ce contrat ?",
    "Y a-t-il des frais cachés ?"
  ]

  // Profils utilisateur
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

  // Fonction pour coller un contrat
  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData("text")
    if (pastedText.length > 100) {
      if (setContractText) setContractText(pastedText)
      setMessage(`Analyse ce contrat : ${pastedText.substring(0, 100)}...`)
      
      toast({
        title: "Contrat détecté !",
        description: `${pastedText.length} caractères prêts à être analysés`,
        duration: 3000,
      })
      
      e.preventDefault()
    }
  }

  // Fonction pour traiter l'envoi de message
  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return
    
    const currentMessage = message
    setMessage("")
    setIsLoading(true)
    
    // Ajouter le message utilisateur
    const newUserMessage: ChatMessage = {
      id: crypto.randomUUID(),
      type: "user",
      content: currentMessage,
      timestamp: new Date().toLocaleTimeString(),
    }
    
    setMessages(prev => [...prev, newUserMessage])

    try {
      if (onSendMessage) {
        const response = await onSendMessage(currentMessage)
        
        if (response && response.data) {
          const newAIMessage: ChatMessage = {
            id: crypto.randomUUID(),
            type: "ai",
            content: response.data.response || response.data,
            timestamp: new Date().toLocaleTimeString(),
            indicator: response.data.indicator || "🤖 ASSISTANT IA",
            analysisType: response.data.analysisType,
            isPlaying: false
          }
          
          setMessages(prev => [...prev, newAIMessage])
          
          // Lecture automatique si l'option vocale est activée
          if (voiceEnabled) {
            setTimeout(() => {
              speakText(newAIMessage.content, newAIMessage.id)
            }, 500)
          }
        }
      }
    } catch (error: any) {
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        type: "ai",
        content: "❌ Désolé, une erreur s'est produite.\n\n🔧 **Détails :** " + (error.response?.data?.error || error.message || "Erreur inconnue"),
        timestamp: new Date().toLocaleTimeString(),
        indicator: '❌ ERREUR'
      }
      setMessages(prev => [...prev, errorMessage])
      
      toast({
        title: "Erreur de communication",
        description: "Impossible de communiquer avec l'IA. Veuillez réessayer.",
        variant: "destructive",
        duration: 4000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour cliquer sur une question rapide
  const handleQuickQuestion = (question: string) => {
    setMessage(question)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Fonction pour effacer la conversation
  const clearConversation = () => {
    setMessages([
      {
        id: crypto.randomUUID(),
        type: "ai",
        content: "👋 Conversation effacée ! Comment puis-je vous aider ?",
        timestamp: new Date().toLocaleTimeString(),
        indicator: "🤖 ASSISTANT IA",
        isPlaying: false
      },
    ])
    if (setContractText) setContractText("")
    
    toast({
      title: "Conversation effacée",
      description: "Tous les messages ont été supprimés",
      duration: 2000,
    })
  }

  // Fonction pour uploader un fichier
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      if (content && setContractText) {
        setContractText(content)
        setMessage(`Analyse ce document : ${file.name}`)
        
        toast({
          title: "Document chargé !",
          description: `${file.name} est prêt à être analysé`,
          duration: 3000,
        })
      }
    }
    reader.readAsText(file)
  }

  // Copier le contenu d'un message
  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Message copié !",
      description: "Le contenu du message a été copié dans le presse-papier",
      duration: 2000,
    })
  }

  // Obtenir l'icône en fonction du type de message
  const getMessageIcon = (messageType?: string) => {
    if (!messageType) return <MessageCircle className="h-4 w-4" />
    
    switch (messageType) {
      case 'contract_analysis':
        return <BookOpen className="h-4 w-4" />
      case 'risk_alert':
        return <AlertTriangle className="h-4 w-4" />
      case 'contract_question':
        return <HelpCircle className="h-4 w-4" />
      default:
        return <MessageCircle className="h-4 w-4" />
    }
  }
  
  // Styliser les messages basés sur leur type
  const getMessageStyle = (msg: ChatMessage) => {
    if (msg.type === "user") {
      return "bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
    }
    
    if (!msg.analysisType) return "bg-white dark:bg-slate-800 dark:text-white"
    
    switch (msg.analysisType) {
      case 'contract_analysis':
        return "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/40 dark:to-cyan-900/40 dark:text-white"
      case 'risk_alert':
        return "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/40 dark:to-orange-900/40 dark:text-white"
      case 'contract_question':
        return "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/40 dark:text-white"
      default:
        return "bg-white dark:bg-slate-800 dark:text-white"
    }
  }
  
  // Gérer les touches clavier
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-[calc(100vh-200px)] min-h-[700px] relative overflow-hidden rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
      {/* Bouton menu mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden absolute top-4 left-4 z-50 bg-white dark:bg-slate-800 shadow-md rounded-full p-2 text-slate-600 dark:text-slate-300"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-80 flex-shrink-0 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col h-full overflow-hidden z-40"
          >
            {/* Sidebar header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="font-bold text-slate-800 dark:text-white text-lg">ClairContrat AI</h2>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveSection('chat')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
                    activeSection === 'chat' 
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' 
                      : 'text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat</span>
                </button>
                <button
                  onClick={() => setActiveSection('contract')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
                    activeSection === 'contract' 
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' 
                      : 'text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>Contrat</span>
                </button>
                <button
                  onClick={() => setActiveSection('profile')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
                    activeSection === 'profile' 
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' 
                      : 'text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Profil</span>
                </button>
              </div>
            </div>
            
            {/* Contenu principal du sidebar */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Section Chat */}
              {activeSection === 'chat' && (
                <div className="space-y-6">
                  {/* Contrôles de conversation */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-indigo-600" />
                      Conversation
                    </h3>
                    <button
                      onClick={clearConversation}
                      className="w-full bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg py-2 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Effacer la conversation
                    </button>
                    {contractText && (
                      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/20 rounded-lg p-3">
                        <p className="text-sm text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                          <span>Contrat chargé ({Math.round(contractText.length/100)/10} K caractères)</span>
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Questions rapides */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      Questions suggérées
                    </h3>
                    <div className="space-y-2">
                      {quickQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickQuestion(question)}
                          className="w-full text-left text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg p-3 transition-all duration-200"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Options vocales */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                      <Volume2 className="h-4 w-4 text-indigo-600" />
                      Options vocales
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                          <Volume2 className="h-4 w-4" />
                          Lecture automatique
                        </span>
                        <button
                          onClick={() => setVoiceEnabled(!voiceEnabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            voiceEnabled ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                              voiceEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      {recognition && (
                        <button
                          onClick={toggleListening}
                          className={`w-full rounded-lg py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 ${
                            isListening
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                              : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                          }`}
                        >
                          {isListening ? (
                            <>
                              <MicOff className="h-4 w-4" />
                              Arrêter l'écoute
                            </>
                          ) : (
                            <>
                              <Mic className="h-4 w-4" />
                              Utiliser ma voix
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Section Contrat */}
              {activeSection === 'contract' && (
                <div className="space-y-6">
                  {/* Upload contrat */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                      <FileText className="h-4 w-4 text-indigo-600" />
                      Importer un contrat
                    </h3>
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept=".txt,.pdf,.doc,.docx"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full bg-white dark:bg-slate-700 border-2 border-dashed border-indigo-300 dark:border-indigo-600 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors group"
                      >
                        <div className="flex flex-col items-center">
                          <Upload className="h-10 w-10 text-indigo-500 mb-3 group-hover:scale-110 transition-transform" />
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Glissez un fichier ou cliquez</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Formats supportés: TXT, PDF, DOC, DOCX</p>
                        </div>
                      </button>
                      
                      <div className="text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">ou</p>
                        <button
                          onClick={() => {
                            toast({
                              title: "Mode collage activé",
                              description: "Collez votre contrat dans la zone de saisie",
                              duration: 3000,
                            })
                            setTimeout(() => {
                              if (inputRef.current) {
                                inputRef.current.focus()
                              }
                            }, 500)
                          }}
                          className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium"
                        >
                          Coller directement dans le chat
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* État du contrat */}
                  {contractText ? (
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-start gap-3">
                        <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-md">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800 dark:text-white mb-1">Contrat chargé</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                            {Math.round(contractText.length/100)/10} K caractères analysables
                          </p>
                          <div className="text-xs">
                            <button
                              onClick={() => {
                                if (setContractText) setContractText("")
                                toast({
                                  title: "Contrat supprimé",
                                  description: "Le contrat a été retiré du contexte",
                                  duration: 2000,
                                })
                              }}
                              className="text-red-600 dark:text-red-400 hover:underline"
                            >
                              Supprimer le contrat
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                          Aucun contrat chargé. Importez ou collez un contrat pour commencer l'analyse.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Section Profil */}
              {activeSection === 'profile' && (
                <div className="space-y-6">
                  {/* Profil utilisateur */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                      <User className="h-4 w-4 text-indigo-600" />
                      Votre profil
                    </h3>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Sélectionnez votre profil pour une analyse personnalisée :
                      </label>
                      <div className="relative">
                        <select
                          value={userPreference}
                          onChange={(e) => {
                            if (setUserPreference) {
                              setUserPreference(e.target.value)
                              const selectedLabel = userPreferences.find(p => p.value === e.target.value)?.label
                              if (selectedLabel && e.target.value) {
                                toast({
                                  title: "Profil mis à jour",
                                  description: `Vos analyses seront adaptées au profil: ${selectedLabel}`,
                                  duration: 3000,
                                })
                              }
                            }
                          }}
                          className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-3 pr-10 text-sm text-slate-700 dark:text-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          {userPreferences.map((pref, index) => (
                            <option key={index} value={pref.value}>
                              {pref.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                    
                    {contractText && userPreference ? (
                      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/20 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-1">
                              Analyse personnalisée activée
                            </p>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400">
                              Profil actif : {userPreferences.find(p => p.value === userPreference)?.label}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : contractText ? (
                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/20 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                          <p className="text-sm text-amber-700 dark:text-amber-300">
                            Sélectionnez un profil pour obtenir une analyse personnalisée de votre contrat.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <HelpCircle className="h-5 w-5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            Chargez d'abord un contrat, puis sélectionnez votre profil pour une analyse personnalisée.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Types d'analyses */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800 dark:text-white">Types d'analyses</h3>
                    <div className="space-y-3 bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white text-sm">Analyse complète</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Résumé et points clés du contrat</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white text-sm">Analyse personnalisée</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Risques spécifiques à votre profil</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white text-sm">Question ciblée</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Réponses sur points spécifiques</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <button
                  onClick={() => setActiveSection('settings')}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <Settings className="h-3.5 w-3.5" />
                  <span>Paramètres</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Interface principale du chat */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 relative">
        {/* En-tête du chat */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white mr-1"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-800 dark:text-white">Assistant IA</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Spécialiste en analyse de contrats</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {contractText && (
                <span className="hidden md:flex items-center gap-1 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 py-1 px-3 rounded-full">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                  Contrat chargé
                </span>
              )}
              
              {userPreference && (
                <span className="hidden md:flex items-center gap-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 py-1 px-3 rounded-full">
                  <User className="h-3.5 w-3.5 mr-1" />
                  {userPreferences.find(p => p.value === userPreference)?.label.split(' ')[1]}
                </span>
              )}
              
              {voiceEnabled ? (
                <button
                  onClick={() => setVoiceEnabled(false)}
                  className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 p-2 rounded-full text-slate-600 dark:text-slate-300"
                  title="Désactiver la synthèse vocale"
                >
                  <Volume2 className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={() => setVoiceEnabled(true)}
                  className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 p-2 rounded-full text-slate-600 dark:text-slate-300"
                  title="Activer la synthèse vocale"
                >
                  <VolumeX className="h-5 w-5" />
                </button>
              )}
              
              {recognition && (
                <button
                  onClick={toggleListening}
                  className={`p-2 rounded-full ${
                    isListening 
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 animate-pulse' 
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                  title={isListening ? "Arrêter l'écoute" : "Utiliser la voix"}
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Corps du chat (messages) */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {messages.map((msg, index) => (
            <div key={msg.id || index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`relative max-w-[85%] ${getMessageStyle(msg)} rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 ${
                  animation && index === messages.length - 1 ? 'animate-pulse' : ''
                }`}
              >
                {/* Indicateur de type pour les messages de l'IA */}
                {msg.type === "ai" && msg.indicator && (
                  <div className="absolute -top-2 -left-2 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-medium shadow-md flex items-center gap-1">
                    {getMessageIcon(msg.analysisType)}
                    <span>{msg.indicator}</span>
                  </div>
                )}
                
                {/* Contenu du message */}
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {msg.content.split('\n').map((line, i) => (
                    <p key={i} className={`${i > 0 ? 'mt-2' : 'mt-0'} ${msg.type === "user" ? "text-white" : "text-slate-800 dark:text-slate-200"}`}>
                      {line}
                    </p>
                  ))}
                </div>
                
                {/* Timestamp et contrôles */}
                <div className={`mt-2 flex items-center justify-between text-xs ${
                  msg.type === "user" ? "text-indigo-100" : "text-slate-500 dark:text-slate-400"
                }`}>
                  <span>{msg.timestamp}</span>
                  
                  {msg.type === "ai" && (
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => copyMessage(msg.content)}
                        className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
                        title="Copier le message"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      
                      {voiceEnabled && (
                        <button
                          onClick={() => msg.isPlaying ? stopSpeaking() : speakText(msg.content, msg.id)}
                          className={`${msg.isPlaying ? 'text-red-500 dark:text-red-400 animate-pulse' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'}`}
                          title={msg.isPlaying ? "Arrêter la lecture" : "Lire à voix haute"}
                        >
                          {msg.isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Indicateur de chargement */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-sm">L'IA analyse votre message...</span>
                </div>
              </div>
            </div>
          )}

          {/* Ancre pour le scroll automatique */}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Zone de saisie */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div className="relative">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onPaste={handlePaste}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Posez une question ou collez un contrat..."
              className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 pr-24 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 disabled:opacity-50 resize-none min-h-[48px] max-h-[120px] overflow-y-auto"
              rows={1}
            />
            
            <div className="absolute bottom-1.5 right-1.5 flex items-center space-x-1">
              {recognition && (
                <button
                  onClick={toggleListening}
                  disabled={isLoading}
                  className={`p-2 rounded-full ${
                    isListening 
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 animate-pulse' 
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500'
                  } disabled:opacity-50`}
                  title={isListening ? "Arrêter l'écoute" : "Dicter votre message"}
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
              )}
              
              <button
                onClick={handleSendMessage}
                disabled={!message.trim() || isLoading}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white p-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          
          {/* Questions rapides en bas */}
          {quickQuestions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 justify-center">
              {quickQuestions.slice(0, 3).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
