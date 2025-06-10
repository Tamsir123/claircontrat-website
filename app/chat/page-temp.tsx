"use client"
import { useState } from "react"
import ImmersiveChatInterface from "@/components/immersive-chat-interface"
import axios from "axios"

export default function ChatPage() {
  const [contractText, setContractText] = useState("")
  const [userPreference, setUserPreference] = useState("")

  // Fonction principale pour le chat intelligent
  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return null
    
    // Détecter le type de message (pour les indicateurs visuels uniquement)
    const messageType = detectMessageType(message)
    
    try {
      // Si c'est un nouveau contrat, le sauvegarder d'abord
      if (messageType === 'contract_analysis') {
        setContractText(message)
      }

      // Envoyer à l'endpoint CHAT unique
      const response = await axios.post('http://localhost:4600/ai/chat', {
        message: message,
        contractContext: messageType === 'contract_analysis' ? message : (contractText || null),
        userProfile: userPreference || null,
        messageType: messageType // Indication pour le prompt
      })
      
      // Construire la réponse avec contexte
      let contextInfo = ""
      if (contractText || messageType === 'contract_analysis') {
        contextInfo = "\n\n📄 *Analyse basée sur le contrat fourni.*"
      }
      if (userPreference) {
        const selectedProfile = userPreferences.find(p => p.value === userPreference)?.label
        contextInfo += `\n🎯 *Adapté à votre profil : ${selectedProfile}*`
      }
      
      const aiResponse = `${response.data.response}${contextInfo}`
      
      // Ajouter des indicateurs visuels selon le type d'analyse
      const typeIndicators = {
        'contract_analysis': '📋 ANALYSE DE CONTRAT',
        'risk_alert': '🚨 ANALYSE PERSONNALISÉE',
        'contract_question': '💡 RÉPONSE SPÉCIFIQUE',
        'general_chat': '✨ ASSISTANT IA'
      }
      
      return {
        data: {
          response: aiResponse,
          indicator: typeIndicators[messageType],
          analysisType: messageType
        }
      }
    } catch (error) {
      console.error('Erreur Chat API:', error)
      throw error
    }
  }

  // Fonction pour détecter le TYPE de contenu (pour les indicateurs visuels uniquement)
  const detectMessageType = (message: string) => {
    const lowerMessage = message.toLowerCase()
    
    // Détection d'un contrat complet
    const contractKeywords = [
      'conditions d\'utilisation', 'conditions générales', 'cgu', 'cgv', 'cgs',
      'politique de confidentialité', 'privacy policy', 'termes et conditions',
      'accord utilisateur', 'licence utilisateur', 'contrat de service',
      'contrat', 'convention', 'bail', 'location', 'abonnement'
    ]
    
    const hasContractKeywords = contractKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    )
    
    const isLongText = message.length > 400
    const hasLegalStructure = /article|clause|section|paragraphe|§|\d+\.|alinéa/i.test(message)
    const hasContractPhrase = /nous collectons|vous acceptez|en utilisant|ce service|cette application/i.test(message)
    
    // Nouveau contrat complet détecté
    if ((isLongText && (hasContractKeywords || hasLegalStructure || hasContractPhrase))) {
      return 'contract_analysis'
    }

    // Demande d'analyse personnalisée
    const riskAnalysisKeywords = [
      'analyse personnalisée', 'selon mon profil', 'pour moi', 'adapté à',
      'risques pour', 'mes risques', 'danger pour', 'préoccupant pour',
      'en tant que', 'comme joueur', 'comme parent', 'comme étudiant'
    ]
    
    const hasRiskKeywords = riskAnalysisKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    )
    
    if (contractText && userPreference && hasRiskKeywords) {
      return 'risk_alert'
    }

    // Question spécifique sur le contrat
    const contractQuestionKeywords = [
      'que signifie', 'qu\'est-ce que', 'c\'est quoi', 'explique',
      'cette clause', 'ce point', 'cette partie', 'ce passage',
      'résiliation', 'annulation', 'remboursement', 'données'
    ]
    
    const hasContractQuestion = contractQuestionKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    )
    
    if (contractText && hasContractQuestion) {
      return 'contract_question'
    }

    // Conversation générale
    return 'general_chat'
  }
  
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

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <ImmersiveChatInterface
        onSendMessage={handleSendMessage}
        contractText={contractText}
        setContractText={setContractText}
        userPreference={userPreference}
        setUserPreference={setUserPreference}
      />
    </div>
  )
}
