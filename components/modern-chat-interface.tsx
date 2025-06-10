"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useToast } from "@/hooks/use-toast" 
import { 
  Send, 
  Sparkles,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  MessageSquare,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Settings,
  Brain,
  Copy,
  PanelRightOpen,
  PanelRightClose,
  RotateCcw,
  RefreshCw,
  FileText,
  User,
  AlertTriangle,
  Wand2
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

export default function ModernChatInterface({
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
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages.length > 0 
    ? initialMessages 
    : [
      {
        id: crypto.randomUUID(),
        type: "ai",
        content: "👋 **Bienvenue sur ClairContrat AI !** \n\nJe suis votre assistant intelligent pour l'analyse de contrats. \n\n✨ **Fonctionnalités :**\n• 📋 Analyse automatique de contrats\n• 🚨 Analyses personnalisées selon votre profil\n• 💡 Réponses à vos questions spécifiques\n• 🎤 Support vocal intégré\n• 🔊 Lecture automatique des réponses\n\n*Tout se passe dans ce chat intelligent !*",
        timestamp: new Date().toLocaleTimeString(),
        indicator: "🤖 ASSISTANT IA",
        isPlaying: false
      },
    ])
  
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      }
      
      speechRecognition.onerror = () => {
        setIsListening(false)
      }
      
      speechRecognition.onend = () => {
        setIsListening(false)
      }
      
      setRecognition(speechRecognition)
    }
  }, [])

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
    utterance.rate = 0.9
    utterance.pitch = 1.0
    utterance.volume = 0.8
    
    utterance.onstart = () => {
      setIsSpeaking(true)
      setCurrentSpeech(utterance)
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, isPlaying: true } : { ...msg, isPlaying: false }
      ))
      
      // Notification de lecture vocale démarrée
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
      
      // Notification d'erreur
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
      
      // Notification d'arrêt de lecture vocale
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
  const handlePaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text")
    if (pastedText.length > 100) {
      if (setContractText) setContractText(pastedText)
      setMessage(`Analyse ce contrat : ${pastedText.substring(0, 200)}...`)
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
            indicator: "🤖 ASSISTANT IA",
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
        id: crypto.randomUUID(),
        type: "ai",
        content: "👋 Conversation effacée ! Comment puis-je vous aider ?",
        timestamp: new Date().toLocaleTimeString(),
        indicator: "🤖 ASSISTANT IA",
        isPlaying: false
      },
    ])
    if (setContractText) setContractText("")
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

  // Fonction pour gérer l'affichage responsive
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarVisible(false)
      } else {
        setSidebarVisible(true)
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

  return (
    <div className="relative h-[calc(100vh-150px)] min-h-[600px] bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex overflow-hidden">
      {/* Barre latérale (sidebar) */}
      <AnimatePresence>
        {sidebarVisible && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col h-full"
          >
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-white">ClairContrat AI</h3>
              </div>
              <button 
                onClick={() => setSidebarVisible(false)}
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Uploader un contrat */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-cyan-100 dark:border-cyan-800/20">
                <h3 className="font-medium text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-600" />
                  Importer un contrat
                </h3>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept=".txt,.pdf,.doc,.docx"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-white dark:bg-slate-700 border border-dashed border-cyan-300 dark:border-cyan-600 rounded-lg p-3 text-center hover:border-cyan-400 transition-colors group flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-cyan-500 group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">Choisir un fichier</span>
                  </button>
                </div>
              </div>

              {/* Questions rapides */}
              <div className="bg-white dark:bg-slate-700 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-600">
                <h3 className="font-medium text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Questions rapides
                </h3>
                <div className="space-y-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="w-full text-left text-sm text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-600 rounded-lg p-2 transition-all duration-200"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Profil utilisateur */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800/20">
                <h3 className="font-medium text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-600" />
                  Votre profil
                </h3>
                <div className="space-y-2">
                  <select
                    value={userPreference}
                    onChange={(e) => setUserPreference && setUserPreference(e.target.value)}
                    className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-2 text-sm text-slate-700 dark:text-slate-300"
                  >
                    {userPreferences.map((pref, index) => (
                      <option key={index} value={pref.value}>
                        {pref.label}
                      </option>
                    ))}
                  </select>
                  {contractText && userPreference && (
                    <div className="bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800/20 rounded-lg p-2">
                      <p className="text-xs text-green-700 dark:text-green-300">
                        ✅ Profil actif : {userPreferences.find(p => p.value === userPreference)?.label}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Options vocales */}
              <div className="bg-white dark:bg-slate-700 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-600">
                <h3 className="font-medium text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                  Options vocales
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-300">Lecture automatique</span>
                    <button
                      onClick={() => setVoiceEnabled(!voiceEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        voiceEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          voiceEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <button
                    onClick={toggleListening}
                    disabled={!recognition}
                    className={`w-full rounded-lg p-2 text-sm font-medium flex items-center justify-center gap-2 ${
                      isListening
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}
                  >
                    {isListening ? (
                      <>
                        <MicOff className="w-4 h-4" />
                        Arrêter l'écoute
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4" />
                        Parler
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white dark:bg-slate-700 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-600">
                <h3 className="font-medium text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-slate-600" />
                  Actions
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={clearConversation}
                    className="w-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg p-2 text-sm font-medium flex items-center justify-center gap-2 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Effacer la conversation
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interface principale */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Bouton pour montrer/cacher la sidebar sur mobile */}
        {!sidebarVisible && (
          <button
            onClick={() => setSidebarVisible(true)}
            className="absolute top-4 left-4 z-10 bg-white dark:bg-slate-700 shadow-md rounded-full p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
          >
            <PanelRightOpen className="w-5 h-5" />
          </button>
        )}

        {/* En-tête */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Assistant IA ClairContrat</h3>
              <p className="text-sm text-cyan-100">Spécialisé en analyse de contrats</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {contractText && (
              <div className="bg-white/20 rounded-full px-3 py-1 text-xs">
                ✅ Contrat chargé
              </div>
            )}
            {userPreference && (
              <div className="bg-white/20 rounded-full px-3 py-1 text-xs">
                👤 {userPreferences.find(p => p.value === userPreference)?.label}
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 dark:bg-slate-900">
          {messages.map((msg, index) => (
            <div key={msg.id || index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`relative max-w-[80%] ${
                  msg.type === "user"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-md"
                } rounded-2xl p-4`}
              >
                {/* Indicateur de type pour les messages de l'IA */}
                {msg.type === "ai" && msg.indicator && (
                  <div className="absolute -top-2 -left-2 bg-cyan-500 text-white text-xs px-2 py-0.5 rounded-full font-medium shadow-md">
                    {msg.indicator}
                  </div>
                )}
                
                {/* Contenu du message avec support markdown */}
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content.split('\n').map((line, i) => (
                    <p key={i} className="mb-2">
                      {line}
                    </p>
                  ))}
                </div>
                
                {/* Timestamp et contrôles */}
                <div className={`mt-2 flex items-center justify-between text-xs ${
                  msg.type === "user" ? "text-cyan-100" : "text-slate-500 dark:text-slate-400"
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
                          className={`${msg.isPlaying ? 'text-red-500' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'}`}
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
              <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-2xl p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-cyan-500 border-t-transparent"></div>
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
          <div className="flex items-center gap-2">
            {/* Bouton micro */}
            {recognition && (
              <button
                onClick={toggleListening}
                className={`p-2 rounded-full ${
                  isListening 
                    ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                }`}
                title={isListening ? "Arrêter l'écoute" : "Parler"}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            )}
            
            {/* Champ de saisie */}
            <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center">
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
                placeholder="Posez une question ou collez un contrat..."
                className="flex-1 bg-transparent border-none px-4 py-3 focus:outline-none text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
              />
              
              {voiceEnabled && (
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
                  title={voiceEnabled ? "Désactiver la synthèse vocale" : "Activer la synthèse vocale"}
                >
                  {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
              )}
            </div>
            
            {/* Bouton d'envoi */}
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          
          {/* Suggestions rapides en bas de l'interface */}
          <div className="mt-3 flex flex-wrap gap-2">
            {quickQuestions.slice(0, 3).map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="text-xs bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
