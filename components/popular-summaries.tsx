// "use client"
// import { motion } from "framer-motion"
// import { CardSpotlight } from "@/components/ui/card-spotlight"
// import { ExternalLink, Shield, AlertTriangle, CheckCircle } from "lucide-react"

// export default function PopularSummaries() {
//   // Composant d'icônes modernes
//   const AppIcon = ({ name, size = "large" }: { name: string, size?: "small" | "large" }) => {
//     const iconProps = {
//       width: size === "large" ? "32" : "20",
//       height: size === "large" ? "32" : "20",
//       viewBox: "0 0 24 24",
//       fill: "white"
//     }

//     const iconStyle = size === "large" 
//       ? "w-16 h-16 rounded-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-200"
//       : "w-8 h-8 rounded-xl flex items-center justify-center transform hover:scale-105 transition-transform duration-200"

//     switch (name) {
//       case "Instagram":
//         return (
//           <div className={`${iconStyle} bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400`}>
//             <svg {...iconProps}>
//               <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//             </svg>
//           </div>
//         )
//       case "TikTok":
//         return (
//           <div className={`${iconStyle} bg-gradient-to-br from-black via-red-500 to-cyan-400`}>
//             <svg {...iconProps} viewBox="0 0 24 24">
//               <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
//             </svg>
//           </div>
//         )
//       case "YouTube":
//         return (
//           <div className={`${iconStyle} bg-red-600`}>
//             <svg {...iconProps}>
//               <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
//             </svg>
//           </div>
//         )
//       case "WhatsApp":
//         return (
//           <div className={`${iconStyle} bg-green-600`}>
//             <svg {...iconProps}>
//               <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
//             </svg>
//           </div>
//         )
//       case "Spotify":
//         return (
//           <div className={`${iconStyle} bg-green-500`}>
//             <svg {...iconProps}>
//               <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
//             </svg>
//           </div>
//         )
//       case "Netflix":
//         return (
//           <div className={`${iconStyle} bg-red-600`}>
//             <svg {...iconProps}>
//               <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.71.002-22.95zM5.398 1.05V24c2.873-.086 5.81-.406 8.489-.618V9.637z"/>
//             </svg>
//           </div>
//         )
//       default:
//         return <div className={iconStyle.replace('hover:scale-105', '')} style={{backgroundColor: '#6b7280'}}>?</div>
//     }
//   }

//   const summaries = [
//     {
//       name: "Instagram",
//       summary: "Collecte extensive de données personnelles, partage avec Meta, publicités ciblées.",
//       riskLevel: "Modéré",
//       riskColor: "text-amber-600",
//       highlights: ["Données partagées avec Facebook", "Géolocalisation collectée", "Résiliation facile"],
//     },
//     {
//       name: "TikTok",
//       summary: "Accès large aux données, algorithme opaque, transferts internationaux de données.",
//       riskLevel: "Élevé",
//       riskColor: "text-red-600",
//       highlights: ["Données envoyées en Chine", "Accès aux contacts", "Difficile à supprimer"],
//     },
//     {
//       name: "YouTube",
//       summary: "Intégration Google, historique de visionnage, recommandations personnalisées.",
//       riskLevel: "Faible",
//       riskColor: "text-emerald-600",
//       highlights: ["Contrôle des données", "Historique effaçable", "Transparence Google"],
//     },
//     {
//       name: "WhatsApp",
//       summary: "Messages chiffrés, métadonnées collectées, partage avec Meta limité.",
//       riskLevel: "Faible",
//       riskColor: "text-emerald-600",
//       highlights: ["Chiffrement bout en bout", "Métadonnées collectées", "Sauvegarde optionnelle"],
//     },
//     {
//       name: "Spotify",
//       summary: "Données d'écoute, recommandations, partage avec partenaires publicitaires.",
//       riskLevel: "Modéré",
//       riskColor: "text-amber-600",
//       highlights: ["Goûts musicaux analysés", "Pub personnalisée", "Export de données possible"],
//     },
//     {
//       name: "Netflix",
//       summary: "Historique de visionnage, profils familiaux, recommandations basées sur l'IA.",
//       riskLevel: "Faible",
//       riskColor: "text-emerald-600",
//       highlights: ["Contrôle parental", "Données de visionnage", "Résiliation simple"],
//     },
//   ]

//   const getRiskIcon = (level: string) => {
//     switch (level) {
//       case "Élevé":
//         return <AlertTriangle className="w-4 h-4" />
//       case "Modéré":
//         return <Shield className="w-4 h-4" />
//       default:
//         return <CheckCircle className="w-4 h-4" />
//     }
//   }

//   return (
//     <section id="popular" className="py-24 bg-gradient-to-br from-slate-50 to-cyan-50/30">
//       <div className="container mx-auto px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">Résumés populaires</h2>
//             <p className="text-xl text-slate-600 max-w-3xl mx-auto">
//               Découvrez ce que cachent les conditions d'utilisation des applications que vous utilisez quotidiennement
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {summaries.map((app, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <CardSpotlight className="h-full">
//                   <div className="relative z-20 space-y-6">
//                     {/* En-tête */}
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-4">
//                         <AppIcon name={app.name} />
//                         <div>
//                           <h3 className="text-2xl font-bold text-slate-800">{app.name}</h3>
//                           <div className={`flex items-center gap-2 ${app.riskColor}`}>
//                             {getRiskIcon(app.riskLevel)}
//                             <span className="text-sm font-medium">Risque {app.riskLevel}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <ExternalLink className="w-5 h-5 text-slate-400 hover:text-cyan-600 cursor-pointer transition-colors" />
//                     </div>

//                     {/* Résumé */}
//                     <p className="text-slate-600 leading-relaxed">{app.summary}</p>

//                     {/* Points clés */}
//                     <div className="space-y-3">
//                       <h4 className="font-semibold text-slate-800">Points clés :</h4>
//                       <ul className="space-y-2">
//                         {app.highlights.map((highlight, idx) => (
//                           <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
//                             <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
//                             {highlight}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     {/* Bouton d'action */}
//                     <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
//                       Lire l'analyse complète
//                     </button>
//                   </div>
//                 </CardSpotlight>
//               </motion.div>
//             ))}
//           </div>

//           {/* Bandeau de confiance */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             viewport={{ once: true }}
//             className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-cyan-100"
//           >
//             <div className="text-center space-y-4">
//               <h3 className="text-2xl font-bold text-slate-800">Faites confiance à ClairContrat</h3>
//               <p className="text-slate-600">
//                 Rejoignez des milliers d'utilisateurs qui protègent leurs droits numériques
//               </p>
//               <div className="flex justify-center items-center gap-6 mt-8 opacity-80">
//                 <AppIcon name="Instagram" size="small" />
//                 <AppIcon name="TikTok" size="small" />
//                 <AppIcon name="YouTube" size="small" />
//                 <AppIcon name="WhatsApp" size="small" />
//                 <AppIcon name="Spotify" size="small" />
//                 <AppIcon name="Netflix" size="small" />
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }
