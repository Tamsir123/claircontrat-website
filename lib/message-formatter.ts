// Utilitaire pour formater les messages avec couleurs et mise en forme
export interface FormattedMessage {
  content: string;
  type: 'user' | 'ai';
  hasFormatting: boolean;
}

export class MessageFormatter {
  /**
   * Formate un message AI avec markdown et couleurs
   */
  static formatAIMessage(content: string): string {
    if (!content) return content;

    let formatted = content;

    // 1. Gestion des titres avec emojis (niveaux H1, H2, H3)
    formatted = formatted.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">$1</h1>');
    formatted = formatted.replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-6 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">$1</h2>');
    formatted = formatted.replace(/^### (.*$)/gim, '<h3 class="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2 mt-4">$1</h3>');

    // 2. Séparateurs visuels
    formatted = formatted.replace(/^---$/gm, '<hr class="my-6 border-slate-200 dark:border-slate-700">');

    // 3. Texte en gras avec couleurs contextuelles
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">$1</strong>');

    // 4. Gestion des sections importantes avec couleurs
    formatted = formatted.replace(/🔍 \*\*(.*?)\*\*/g, '<div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg"><h4 class="text-lg font-bold text-blue-800 dark:text-blue-200 flex items-center gap-2">🔍 $1</h4></div>');
    formatted = formatted.replace(/🔎 \*\*(.*?)\*\*/g, '<div class="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4 my-4 rounded-r-lg"><h4 class="text-lg font-bold text-orange-800 dark:text-orange-200 flex items-center gap-2">🔎 $1</h4></div>');

    // 5. Listes à puces avec icônes colorées
    formatted = formatted.replace(/^- (🚨.*$)/gm, '<div class="flex items-start gap-3 my-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800"><span class="text-red-500 font-bold mt-1">•</span><span class="flex-1 text-red-800 dark:text-red-200">$1</span></div>');
    formatted = formatted.replace(/^- (⚠️.*$)/gm, '<div class="flex items-start gap-3 my-3 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-200 dark:border-amber-800"><span class="text-amber-500 font-bold mt-1">•</span><span class="flex-1 text-amber-800 dark:text-amber-200">$1</span></div>');
    formatted = formatted.replace(/^- (🔒.*$)/gm, '<div class="flex items-start gap-3 my-3 p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-200 dark:border-purple-800"><span class="text-purple-500 font-bold mt-1">•</span><span class="flex-1 text-purple-800 dark:text-purple-200">$1</span></div>');
    formatted = formatted.replace(/^- (📡.*$)/gm, '<div class="flex items-start gap-3 my-3 p-3 bg-indigo-50 dark:bg-indigo-900/10 rounded-lg border border-indigo-200 dark:border-indigo-800"><span class="text-indigo-500 font-bold mt-1">•</span><span class="flex-1 text-indigo-800 dark:text-indigo-200">$1</span></div>');
    formatted = formatted.replace(/^- (💸.*$)/gm, '<div class="flex items-start gap-3 my-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800"><span class="text-green-500 font-bold mt-1">•</span><span class="flex-1 text-green-800 dark:text-green-200">$1</span></div>');

    // 6. Listes à puces génériques
    formatted = formatted.replace(/^- (.*$)/gm, '<div class="flex items-start gap-3 my-2"><span class="text-cyan-500 font-bold mt-1 text-sm">•</span><span class="flex-1">$1</span></div>');

    // 7. Scores de risque avec badge coloré
    formatted = formatted.replace(/(\d+%.*(?:risque|danger|critique).*)/gi, '<div class="inline-block bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-full px-4 py-2 my-2"><span class="text-red-700 dark:text-red-300 font-bold text-lg">$1</span></div>');

    // 8. Conseils et actions avec couleur verte
    formatted = formatted.replace(/(✅.*$)/gm, '<div class="flex items-start gap-2 my-2 p-2 bg-emerald-50 dark:bg-emerald-900/10 rounded-lg"><span class="text-emerald-600 mt-1">✅</span><span class="text-emerald-800 dark:text-emerald-200">$1</span></div>');
    formatted = formatted.replace(/(❌.*$)/gm, '<div class="flex items-start gap-2 my-2 p-2 bg-red-50 dark:bg-red-900/10 rounded-lg"><span class="text-red-600 mt-1">❌</span><span class="text-red-800 dark:text-red-200">$1</span></div>');

    // 9. Gestion des majuscules importantes (mots en CAPS)
    formatted = formatted.replace(/\b([A-Z]{3,})\b/g, '<span class="bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100 px-1 rounded font-bold text-sm">$1</span>');

    // 10. Nettoyage et espacement
    formatted = formatted.replace(/\n\n/g, '<div class="my-4"></div>');
    formatted = formatted.replace(/\n/g, '<br>');

    return formatted;
  }

  /**
   * Détermine si un message nécessite un formatage spécial
   */
  static needsFormatting(content: string): boolean {
    const formattingPatterns = [
      /\*\*.*?\*\*/,  // Texte en gras
      /^#{1,3} /m,    // Titres markdown
      /^- /m,         // Listes
      /🔍|🔎|🚨|⚠️|🔒|📡|💸/, // Emojis de structure
      /---/,          // Séparateurs
      /\d+%/          // Pourcentages
    ];

    return formattingPatterns.some(pattern => pattern.test(content));
  }

  /**
   * Formate selon le type de message (summary, risk-alert, chat)
   */
  static formatByType(content: string, messageType?: string): string {
    if (!this.needsFormatting(content)) {
      return content.replace(/\n/g, '<br>');
    }

    let formatted = this.formatAIMessage(content);

    // Adaptations spécifiques par type
    switch (messageType) {
      case 'contract_analysis':
        // Ajouter un cadre spécial pour les résumés
        formatted = `<div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r-lg">${formatted}</div>`;
        break;
      
      case 'risk_alert':
        // Ajouter un cadre d'alerte
        formatted = `<div class="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-r-lg">${formatted}</div>`;
        break;
      
      case 'contract_question':
        // Ajouter un cadre informatif
        formatted = `<div class="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-r-lg">${formatted}</div>`;
        break;
    }

    return formatted;
  }
}

export default MessageFormatter;
