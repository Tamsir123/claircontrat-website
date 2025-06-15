"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import Navigation from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Search, FileText, Calendar, AlertTriangle, CheckCircle, Shield, Download, Eye, Clock, Filter, TrendingUp } from "lucide-react"

export default function HistoriquePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterRisk, setFilterRisk] = useState("all")

  // Composant d'icônes modernes pour les types de contrats
  const ContractIcon = ({ type }: { type: string }) => {
    const iconProps = {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "white"
    }

    const iconStyle = "w-12 h-12 rounded-xl flex items-center justify-center transform hover:scale-105 transition-transform duration-200"

    switch (type) {
      case "Réseau social":
        return (
          <div className={`${iconStyle} bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400`}>
            <svg {...iconProps}>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
        )
      case "Streaming":
        return (
          <div className={`${iconStyle} bg-red-600`}>
            <svg {...iconProps}>
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
        )
      case "Messagerie":
        return (
          <div className={`${iconStyle} bg-green-600`}>
            <svg {...iconProps}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
            </svg>
          </div>
        )
      case "Musique":
        return (
          <div className={`${iconStyle} bg-green-500`}>
            <svg {...iconProps}>
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </div>
        )
      default:
        return (
          <div className={`${iconStyle} bg-gradient-to-r from-slate-500 to-slate-600`}>
            <FileText className="w-6 h-6 text-white" />
          </div>
        )
    }
  }

  const contracts = [
    {
      id: 1,
      name: "Conditions d'utilisation Instagram",
      type: "Réseau social",
      date: "2024-01-15",
      riskLevel: "Modéré",
      riskColor: "text-amber-600",
      summary: "Collecte extensive de données personnelles, partage avec Meta",
      status: "Analysé",
    },
    {
      id: 2,
      name: "Abonnement Netflix Premium",
      type: "Streaming",
      date: "2024-01-10",
      riskLevel: "Faible",
      riskColor: "text-emerald-600",
      summary: "Conditions claires, résiliation facile, pas de frais cachés",
      status: "Analysé",
    },
    {
      id: 3,
      name: "CGU TikTok",
      type: "Réseau social",
      date: "2024-01-08",
      riskLevel: "Élevé",
      riskColor: "text-red-600",
      summary: "Transferts de données vers la Chine, accès large aux données",
      status: "Analysé",
    },
    {
      id: 4,
      name: "Contrat Spotify Premium",
      type: "Musique",
      date: "2024-01-05",
      riskLevel: "Modéré",
      riskColor: "text-amber-600",
      summary: "Analyse des goûts musicaux, publicités ciblées",
      status: "Analysé",
    },
    {
      id: 5,
      name: "Conditions WhatsApp Business",
      type: "Messagerie",
      date: "2024-01-03",
      riskLevel: "Faible",
      riskColor: "text-emerald-600",
      summary: "Messages chiffrés, métadonnées collectées",
      status: "Analysé",
    },
    {
      id: 6,
      name: "Abonnement YouTube Premium",
      type: "Streaming",
      date: "2024-01-01",
      riskLevel: "Faible",
      riskColor: "text-emerald-600",
      summary: "Intégration Google, contrôles de confidentialité disponibles",
      status: "Analysé",
    },
  ]

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "Élevé":
        return <AlertTriangle className="w-4 h-4" />
      case "Modéré":
        return <Shield className="w-4 h-4" />
      default:
        return <CheckCircle className="w-4 h-4" />
    }
  }

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch = contract.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || contract.type === filterType
    const matchesRisk = filterRisk === "all" || contract.riskLevel === filterRisk
    return matchesSearch && matchesType && matchesRisk
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-brand-50/20 dark:from-navy-950 dark:to-navy-900">
      <Navigation />

      {/* Header compact et fonctionnel */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12"
            >
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4">
                  Mon historique
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Gérez et consultez vos {contracts.length} analyses de contrats
                </p>
              </div>
              
              {/* Actions rapides */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Exporter tout
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-brand-500 to-navy-600 text-white rounded-lg hover:from-brand-600 hover:to-navy-700 transition-all duration-200 shadow-lg"
                >
                  <FileText className="w-4 h-4" />
                  Nouveau contrat
                </motion.button>
              </div>
            </motion.div>

      {/* Section de recherche et filtres */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Barre de recherche et filtres améliorée */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50 mb-12 relative overflow-hidden"
            >
              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer"></div>
              
              <div className="flex flex-col lg:flex-row gap-6 relative z-10">
                {/* Recherche améliorée */}
                <div className="flex-1 relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-hover:text-brand-500 w-5 h-5 transition-colors" />
                  <input
                    type="text"
                    placeholder="Rechercher dans vos contrats..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50/80 dark:bg-slate-700/80 border border-slate-200/50 dark:border-slate-600/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 text-slate-800 dark:text-white transition-all duration-200 hover:shadow-lg"
                  />
                </div>

                {/* Filtres modernisés */}
                <div className="flex gap-4 flex-wrap">
                  <motion.select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-6 py-4 bg-slate-50/80 dark:bg-slate-700/80 border border-slate-200/50 dark:border-slate-600/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 text-slate-800 dark:text-white transition-all duration-200 hover:shadow-lg cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <option value="all">🏷️ Tous les types</option>
                    <option value="Réseau social">📱 Réseau social</option>
                    <option value="Streaming">🎬 Streaming</option>
                    <option value="Messagerie">💬 Messagerie</option>
                    <option value="Musique">🎵 Musique</option>
                  </motion.select>

                  <motion.select
                    value={filterRisk}
                    onChange={(e) => setFilterRisk(e.target.value)}
                    className="px-6 py-4 bg-slate-50/80 dark:bg-slate-700/80 border border-slate-200/50 dark:border-slate-600/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 text-slate-800 dark:text-white transition-all duration-200 hover:shadow-lg cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <option value="all">⚖️ Tous les risques</option>
                    <option value="Faible">🟢 Risque faible</option>
                    <option value="Modéré">🟡 Risque modéré</option>
                    <option value="Élevé">🔴 Risque élevé</option>
                  </motion.select>
                </div>
              </div>
            </motion.div>

            {/* Liste des contrats améliorée */}
            <div className="space-y-6">
              {filteredContracts.map((contract, index) => (
                <motion.div
                  key={contract.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Badge de risque flottant */}
                  <div className={`absolute top-6 right-6 z-20 px-4 py-2 rounded-full text-xs font-bold text-white ${
                    contract.riskLevel === "Élevé" ? "bg-red-500" :
                    contract.riskLevel === "Modéré" ? "bg-amber-500" : "bg-green-500"
                  }`}>
                    {contract.riskLevel}
                  </div>

                  {/* Effet de brillance au hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-200/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-start gap-6 flex-1">
                      <motion.div
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <ContractIcon type={contract.type} />
                      </motion.div>

                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                              {contract.name}
                            </h3>
                          <span className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium">
                            {contract.type}
                          </span>
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed text-lg">
                          {contract.summary}
                        </p>

                        <div className="flex items-center gap-8 text-sm">
                          <motion.div 
                            className="flex items-center gap-3"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Calendar className="w-5 h-5 text-slate-400" />
                            <span className="text-slate-500 dark:text-slate-400 font-medium">
                              {new Date(contract.date).toLocaleDateString("fr-FR", {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                          </motion.div>

                          <motion.div 
                            className={`flex items-center gap-3 ${contract.riskColor}`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {getRiskIcon(contract.riskLevel)}
                            <span className="font-semibold">Risque {contract.riskLevel}</span>
                          </motion.div>

                          <motion.div 
                            className="flex items-center gap-3"
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="w-3 h-3 bg-brand-500 rounded-full animate-pulse"></div>
                            <span className="text-brand-600 dark:text-brand-400 font-medium">{contract.status}</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <motion.button 
                        className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="w-4 h-4" />
                        Télécharger
                      </motion.button>
                      <motion.button 
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-navy-600 text-white rounded-xl hover:from-brand-600 hover:to-navy-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="w-4 h-4" />
                        Revoir analyse
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message si aucun résultat - amélioré */}
            {filteredContracts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-white/50 dark:border-slate-700/50"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-24 h-24 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 rounded-3xl flex items-center justify-center mx-auto mb-6"
                >
                  <FileText className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-600 dark:text-slate-400 mb-3">
                  Aucun contrat trouvé
                </h3>
                <p className="text-slate-500 dark:text-slate-500 mb-8 text-lg">
                  Essayez de modifier vos critères de recherche ou analysez votre premier contrat.
                </p>
                <motion.button 
                  className="bg-gradient-to-r from-brand-500 to-navy-600 text-white px-8 py-4 rounded-xl hover:from-brand-600 hover:to-navy-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Analyser un contrat
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Section CTA pour analyser plus de contrats */}
      <section className="py-24 relative overflow-hidden">
        {/* Fond avec effet */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-navy-700 dark:from-brand-800 dark:to-navy-900"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/20"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TrendingUp className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Continuez à protéger vos droits !
            </h2>
            <p className="text-xl text-brand-100 mb-10 leading-relaxed">
              Vous avez déjà analysé {contracts.length} contrats. 
              Restez vigilant et analysez tous vos nouveaux contrats pour une protection maximale.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-white text-brand-600 font-semibold py-4 px-8 rounded-xl hover:bg-brand-50 transition-all duration-200 shadow-xl hover:shadow-2xl relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Analyser un nouveau contrat</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-brand-50 to-navy-50"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              
              <motion.button 
                className="border-2 border-white/30 text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Exporter mon historique
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
