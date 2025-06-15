"use client"
import { motion } from "framer-motion"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import Navigation from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { ExternalLink, Shield, AlertTriangle, CheckCircle } from "lucide-react"

export default function ResumesPopulairesPage() {
  // Composant d'icônes modernes
  const AppIcon = ({ name }: { name: string }) => {
    const iconProps = {
      width: "32",
      height: "32",
      viewBox: "0 0 24 24",
      fill: "white"
    }

    const iconStyle = "w-16 h-16 rounded-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-200"

    switch (name) {
      case "Instagram":
        return (
          <div className={`${iconStyle} bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400`}>
            <svg {...iconProps}>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
        )
      case "TikTok":
        return (
          <div className={`${iconStyle} bg-gradient-to-br from-black via-red-500 to-cyan-400`}>
            <svg {...iconProps} viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </div>
        )
      case "YouTube":
        return (
          <div className={`${iconStyle} bg-red-600`}>
            <svg {...iconProps}>
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
        )
      case "WhatsApp":
        return (
          <div className={`${iconStyle} bg-green-600`}>
            <svg {...iconProps}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
            </svg>
          </div>
        )
      case "Spotify":
        return (
          <div className={`${iconStyle} bg-green-500`}>
            <svg {...iconProps}>
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </div>
        )
      case "Netflix":
        return (
          <div className={`${iconStyle} bg-red-600`}>
            <svg {...iconProps}>
              <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.71.002-22.95zM5.398 1.05V24c2.873-.086 5.81-.406 8.489-.618V9.637z"/>
            </svg>
          </div>
        )
      default:
        return <div className={iconStyle.replace('hover:scale-105', '')} style={{backgroundColor: '#6b7280'}}>?</div>
    }
  }

  const summaries = [
    {
      name: "Instagram",
      summary:
        "Collecte extensive de données personnelles incluant photos, messages, géolocalisation. Partage avec Meta et partenaires publicitaires. Algorithme de recommandation opaque.",
      riskLevel: "Modéré",
      riskColor: "text-amber-600",
      highlights: [
        "Données partagées avec Facebook et WhatsApp",
        "Géolocalisation collectée en permanence",
        "Résiliation facile mais données conservées",
      ],
    },
    {
      name: "TikTok",
      summary:
        "Accès très large aux données personnelles, transferts vers la Chine, algorithme hautement personnalisé. Collecte de données biométriques et comportementales avancées.",
      riskLevel: "Élevé",
      riskColor: "text-red-600",
      highlights: [
        "Données envoyées vers des serveurs chinois",
        "Accès aux contacts et calendrier",
        "Suppression de compte complexe",
      ],
    },
    {
      name: "YouTube",
      summary:
        "Intégration complète avec l'écosystème Google. Historique de visionnage détaillé, recommandations basées sur l'IA. Contrôles de confidentialité disponibles.",
      riskLevel: "Faible",
      riskColor: "text-emerald-600",
      highlights: [
        "Contrôle granulaire des données",
        "Historique effaçable facilement",
        "Transparence sur l'utilisation des données",
      ],
    },
    {
      name: "WhatsApp",
      summary:
        "Messages chiffrés de bout en bout, mais métadonnées collectées. Partage limité avec Meta depuis 2021. Sauvegardes non chiffrées sur le cloud.",
      riskLevel: "Faible",
      riskColor: "text-emerald-600",
      highlights: [
        "Chiffrement bout en bout des messages",
        "Métadonnées de connexion collectées",
        "Sauvegarde cloud optionnelle",
      ],
    },
    {
      name: "Spotify",
      summary:
        "Analyse approfondie des goûts musicaux, partage avec labels et artistes. Publicités ciblées basées sur l'écoute. Données d'humeur et d'activité collectées.",
      riskLevel: "Modéré",
      riskColor: "text-amber-600",
      highlights: [
        "Profil musical détaillé créé",
        "Partage avec l'industrie musicale",
        "Export de données personnelles possible",
      ],
    },
    {
      name: "Netflix",
      summary:
        "Historique de visionnage complet, analyse des préférences, profils familiaux. Recommandations basées sur l'IA. Contrôle parental avancé disponible.",
      riskLevel: "Faible",
      riskColor: "text-emerald-600",
      highlights: ["Contrôle parental robuste", "Données de visionnage analysées", "Résiliation simple sans pénalités"],
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navigation />

      {/* Hero Section avec effet parallax */}
      <section className="relative py-32 overflow-hidden">
        {/* Fond animé avec particules */}
        <div className="absolute inset-0">
          {/* Gradient de fond dynamique */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-cyan-50/30 to-slate-50/50 dark:from-slate-900/80 dark:via-blue-900/20 dark:to-slate-900/80"></div>
          
          {/* Particules flottantes */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl"
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: Math.random() * 8 + 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              {/* Badge animé */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-cyan-200 dark:border-cyan-800"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-2 h-2 bg-cyan-500 rounded-full"
                />
                Analyses IA en temps réel
              </motion.div>

              {/* Titre avec effet de gradient */}
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-slate-800 via-blue-800 to-cyan-800 dark:from-white dark:via-blue-200 dark:to-cyan-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Résumés populaires
              </motion.h1>
              
              {/* Sous-titre avec animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="relative"
              >
                <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
                  Découvrez ce que cachent vraiment les conditions d'utilisation des applications que vous utilisez quotidiennement. 
                  <span className="text-cyan-600 dark:text-cyan-400 font-semibold"> Analyses détaillées par notre IA.</span>
                </p>
                
                {/* Ligne animée sous le texte */}
                <motion.div
                  className="absolute -bottom-4 left-1/2 w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                  initial={{ width: 0, x: "-50%" }}
                  animate={{ width: 128, x: "-50%" }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
              </motion.div>

              {/* Statistiques impressionnantes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex items-center justify-center gap-8 lg:gap-12 mt-16 flex-wrap"
              >
                {[
                  { number: "50M+", label: "Utilisateurs protégés" },
                  { number: "99%", label: "Précision IA" },
                  { number: "24/7", label: "Surveillance active" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl lg:text-4xl font-bold text-cyan-600 dark:text-cyan-400">
                      {stat.number}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section principale avec les cartes */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Filtres interactifs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 mb-12 flex-wrap"
            >
              {["Tous", "Risque Élevé", "Risque Modéré", "Risque Faible"].map((filter, index) => (
                <motion.button
                  key={filter}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    index === 0 
                      ? "bg-cyan-500 text-white shadow-lg" 
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter}
                </motion.button>
              ))}
            </motion.div>

            {/* Grille des cartes améliorée */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {summaries.map((app, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <CardSpotlight className="h-full relative overflow-hidden">
                    {/* Badge de risque flottant */}
                    <div className={`absolute top-4 right-4 z-30 px-3 py-1 rounded-full text-xs font-bold text-white ${
                      app.riskLevel === "Élevé" ? "bg-red-500" :
                      app.riskLevel === "Modéré" ? "bg-amber-500" : "bg-green-500"
                    }`}>
                      {app.riskLevel}
                    </div>

                    <div className="relative z-20 space-y-6 p-6">
                      {/* En-tête amélioré */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <motion.div
                            whileHover={{ rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <AppIcon name={app.name} />
                          </motion.div>
                          <div>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                              {app.name}
                            </h3>
                            <div className={`flex items-center gap-2 ${app.riskColor}`}>
                              {getRiskIcon(app.riskLevel)}
                              <span className="text-sm font-medium">Risque {app.riskLevel}</span>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 15 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <ExternalLink className="w-5 h-5 text-slate-400 hover:text-cyan-600 cursor-pointer transition-colors" />
                        </motion.div>
                      </div>

                      {/* Résumé avec meilleure lisibilité */}
                      <div className="relative">
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                          {app.summary}
                        </p>
                        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-200 dark:via-cyan-800 to-transparent"></div>
                      </div>

                      {/* Points clés avec animations */}
                      <motion.div 
                        className="space-y-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h4 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          Points clés
                        </h4>
                        <ul className="space-y-2">
                          {app.highlights.map((highlight, idx) => (
                            <motion.li 
                              key={idx} 
                              className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                              {highlight}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>

                      {/* Bouton d'action amélioré */}
                      <motion.button 
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:from-cyan-600 hover:to-blue-700 hover:shadow-xl hover:shadow-cyan-500/25 relative overflow-hidden group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10">Lire l'analyse complète</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                      </motion.button>
                    </div>
                  </CardSpotlight>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section améliorée */}
      <section className="py-24 relative overflow-hidden">
        {/* Fond avec effet */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-800 dark:to-blue-900"></div>
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
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl"
              >
                🤖
              </motion.div>
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Votre contrat n'est pas dans la liste ?
            </h2>
            <p className="text-xl text-cyan-100 mb-10 leading-relaxed">
              Analysez n'importe quel contrat avec notre IA de pointe en quelques secondes. 
              Plus de 10 000 contrats analysés chaque jour !
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-white text-cyan-600 font-semibold py-4 px-8 rounded-xl hover:bg-cyan-50 transition-all duration-200 shadow-xl hover:shadow-2xl relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Analyser un nouveau contrat</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50"
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
                Voir des exemples
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
