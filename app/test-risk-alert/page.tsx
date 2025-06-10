"use client"
import { motion } from "motion/react"
import { useState } from "react"
import Navigation from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { AlertCircle, Shield, Send, Copy, Check } from "lucide-react"
import axios from "axios"

export default function TestRiskAlertPage() {
  const [contractText, setContractText] = useState("")
  const [userPreference, setUserPreference] = useState("")
  const [alertResult, setAlertResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const userPreferences = [
    "Je suis fan de Naruto et j'aime les références manga",
    "Je préfère un langage simple et familier",
    "J'aime les références pop culture et films",
    "Utilise des métaphores sportives",
    "Parle-moi comme à un entrepreneur tech",
    "Je préfère un ton très professionnel",
    "Explique-moi comme si j'avais 12 ans",
    "J'aime les références de jeux vidéo",
    "Utilise des références culinaires",
    "Parle-moi comme un ami proche",
  ]

  const sampleContracts = [
    {
      name: "Instagram - Conditions d'utilisation",
      text: `En acceptant ces conditions, vous accordez à Instagram une licence mondiale, non exclusive, libre de redevances et transférable (avec droit de sous-licence) pour utiliser, distribuer, modifier, exécuter, copier, représenter publiquement ou afficher publiquement, traduire et créer des œuvres dérivées de votre contenu d'utilisateur conformément à vos paramètres de confidentialité. Cette licence prend fin lorsque votre contenu d'utilisateur est supprimé de nos services. Vous pouvez supprimer du contenu individuellement ou en bloc en supprimant votre compte. Instagram collecte des informations sur vous de différentes manières : les informations que vous nous fournissez directement, les informations que nous collectons automatiquement lorsque vous utilisez nos services, et les informations que nous obtenons d'autres sources.`,
    },
    {
      name: "Netflix - Conditions d'utilisation",
      text: `Votre abonnement Netflix sera automatiquement renouvelé et vous serez facturé(e) de façon récurrente selon la fréquence de facturation (mensuelle ou annuelle) que vous avez sélectionnée lors de votre inscription, jusqu'à ce que vous l'annuliez. Les tarifs peuvent changer à tout moment. Vous devez disposer d'un accès Internet et d'un appareil compatible avec Netflix pour visionner le contenu Netflix. La qualité de l'affichage du contenu Netflix peut varier selon de nombreux facteurs. Vous êtes seul(e) responsable de tous les frais Internet et des données mobiles que vous pourriez avoir à payer en lien avec l'utilisation du service Netflix.`,
    },
    {
      name: "WhatsApp - Politique de confidentialité",
      text: `WhatsApp doit recevoir ou collecter certaines informations pour vous fournir nos Services. Les types d'informations que nous recevons et collectons dépendent de la façon dont vous utilisez nos Services. Nous recevons les informations que vous nous fournissez directement, comme lorsque vous créez votre compte, mettez à jour votre profil, utilisez nos Services, ou nous contactez. Nous partageons vos informations avec d'autres entreprises de Meta pour assurer la sécurité et la protection, lutter contre le spam et les abus, et améliorer nos Services.`,
    },
  ]

  const handleGenerateAlert = async () => {
    if (!contractText.trim() || !userPreference) {
      alert("Veuillez remplir le contrat et sélectionner une préférence")
      return
    }

    setIsLoading(true)
    setAlertResult("")

    try {
      const response = await axios.post('http://localhost:4600/contract/risk-alert', {
        contractText,
        userPreference
      })
      setAlertResult(response.data.alert)
    } catch (error) {
      console.error("Erreur:", error)
      setAlertResult("Erreur lors de la génération de l'alerte. Vérifiez que le backend est démarré.")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(alertResult)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="py-24 bg-white dark:bg-slate-900 pt-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6">
                Test d'Alerte de Risque Personnalisée
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Testez notre système d'alertes personnalisées qui adapte le ton et le style selon vos préférences
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Configuration */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-cyan-600" />
                    Configuration du test
                  </h2>

                  {/* Contrats d'exemple */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      Contrats d'exemple :
                    </label>
                    <div className="grid gap-2">
                      {sampleContracts.map((contract, index) => (
                        <button
                          key={index}
                          onClick={() => setContractText(contract.text)}
                          className="text-left p-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                        >
                          <span className="text-sm font-medium text-slate-800 dark:text-white">
                            {contract.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Texte du contrat */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Texte du contrat :
                    </label>
                    <textarea
                      value={contractText}
                      onChange={(e) => setContractText(e.target.value)}
                      placeholder="Collez ici le texte du contrat à analyser..."
                      className="w-full h-40 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 resize-none"
                    />
                  </div>

                  {/* Préférence utilisateur */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Style de communication préféré :
                    </label>
                    <select
                      value={userPreference}
                      onChange={(e) => setUserPreference(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
                    >
                      <option value="">Sélectionnez un style...</option>
                      {userPreferences.map((pref, index) => (
                        <option key={index} value={pref}>
                          {pref}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Bouton de génération */}
                  <button
                    onClick={handleGenerateAlert}
                    disabled={!contractText.trim() || !userPreference || isLoading}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6 rounded-xl font-medium hover:from-red-600 hover:to-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Génération en cours...
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5" />
                        🚨 Générer l'alerte personnalisée
                      </>
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Résultat */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                      Alerte générée
                    </h2>
                    {alertResult && (
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                        <span className="text-sm">{copied ? "Copié!" : "Copier"}</span>
                      </button>
                    )}
                  </div>

                  {alertResult ? (
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800/20">
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <div className="whitespace-pre-wrap text-slate-800 dark:text-slate-200">
                          {alertResult}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-slate-500 dark:text-slate-400">
                      <div className="text-center">
                        <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>L'alerte personnalisée apparaîtra ici</p>
                        <p className="text-sm mt-2">Configurez les paramètres et cliquez sur "Générer"</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl p-6 border border-cyan-200 dark:border-cyan-800/20"
            >
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                Comment tester l'API d'alerte de risque :
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300">
                <div>
                  <h4 className="font-medium text-slate-800 dark:text-white mb-2">📋 Étapes :</h4>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Sélectionnez un contrat d'exemple ou collez votre propre texte</li>
                    <li>Choisissez un style de communication</li>
                    <li>Cliquez sur "Générer l'alerte personnalisée"</li>
                    <li>Observez comment l'IA adapte son ton selon vos préférences</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 dark:text-white mb-2">🚀 URL de l'API :</h4>
                  <code className="bg-slate-800 text-green-400 px-2 py-1 rounded text-xs">
                    POST http://localhost:4600/contract/risk-alert
                  </code>
                  <p className="mt-2">
                    <strong>Paramètres requis :</strong> contractText, userPreference
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
