/**
 * MessageFormatter - Utilitaire pour formater les messages du chat
 * Convertit le texte brut en HTML formaté selon le type d'analyse
 */

import { marked } from 'marked';

export class MessageFormatter {
  /**
   * Formate le contenu des messages selon leur type d'analyse
   */
  static formatByType(content: string, analysisType?: string): string {
    // Convertir le markdown en HTML
    let formattedContent = this.markdownToHtml(content);
    
    // Appliquer un formatage spécifique selon le type d'analyse
    switch (analysisType) {
      case 'contract_analysis':
        formattedContent = this.highlightContractAnalysis(formattedContent);
        break;
      case 'risk_alert':
        formattedContent = this.highlightRiskAlert(formattedContent);
        break;
      case 'contract_question':
        formattedContent = this.highlightContractQuestion(formattedContent);
        break;
      default:
        // Formatage général pour les conversations
        break;
    }

    return formattedContent;
  }

  /**
   * Convertit le texte Markdown en HTML
   */
  private static markdownToHtml(text: string): string {
    try {
      return marked.parse(text) as string;
    } catch (error) {
      console.error("Erreur de conversion Markdown:", error);
      return text;
    }
  }

  /**
   * Ajoute des styles spécifiques pour les analyses de contrat
   */
  private static highlightContractAnalysis(html: string): string {
    // Mettre en évidence les sections et les titres
    html = html.replace(/<h2>(.*?)<\/h2>/g, '<h2 class="text-cyan-600 dark:text-cyan-400 text-lg font-bold my-3">$1</h2>');
    html = html.replace(/<h3>(.*?)<\/h3>/g, '<h3 class="text-cyan-500 dark:text-cyan-300 text-base font-semibold my-2">$1</h3>');
    
    // Mettre en évidence les listes
    html = html.replace(/<ul>/g, '<ul class="list-disc pl-5 my-2 space-y-1">');
    html = html.replace(/<li>/g, '<li class="text-slate-700 dark:text-slate-300">');
    
    // Ajouter des styles pour les paragraphes
    html = html.replace(/<p>/g, '<p class="my-2">');
    
    return html;
  }

  /**
   * Ajoute des styles spécifiques pour les alertes de risque
   */
  private static highlightRiskAlert(html: string): string {
    // Mettre en évidence les alertes et les risques
    html = html.replace(/<h2>(.*?)risque(.*?)<\/h2>/gi, '<h2 class="text-red-600 dark:text-red-400 text-lg font-bold my-3">$1risque$2</h2>');
    html = html.replace(/<h3>(.*?)risque(.*?)<\/h3>/gi, '<h3 class="text-red-500 dark:text-red-300 text-base font-semibold my-2">$1risque$2</h3>');
    html = html.replace(/<h2>(.*?)alerte(.*?)<\/h2>/gi, '<h2 class="text-amber-600 dark:text-amber-400 text-lg font-bold my-3">$1alerte$2</h2>');
    html = html.replace(/<h3>(.*?)alerte(.*?)<\/h3>/gi, '<h3 class="text-amber-500 dark:text-amber-300 text-base font-semibold my-2">$1alerte$2</h3>');
    
    // Mettre en évidence les listes
    html = html.replace(/<ul>/g, '<ul class="list-disc pl-5 my-2 space-y-1">');
    html = html.replace(/<li>/g, '<li class="text-slate-700 dark:text-slate-300">');
    
    // Mettre en évidence les termes relatifs aux risques
    html = html.replace(/\b(attention|dangereux|risqué|préoccupant|problématique|vigilance)\b/gi, 
      '<span class="text-red-600 dark:text-red-400 font-medium">$1</span>');
    
    // Ajouter des styles pour les paragraphes
    html = html.replace(/<p>/g, '<p class="my-2">');
    
    return html;
  }

  /**
   * Ajoute des styles spécifiques pour les questions sur le contrat
   */
  private static highlightContractQuestion(html: string): string {
    // Mettre en évidence les réponses aux questions
    html = html.replace(/<h2>(.*?)<\/h2>/g, '<h2 class="text-blue-600 dark:text-blue-400 text-lg font-bold my-3">$1</h2>');
    html = html.replace(/<h3>(.*?)<\/h3>/g, '<h3 class="text-blue-500 dark:text-blue-300 text-base font-semibold my-2">$1</h3>');
    
    // Mettre en évidence les listes
    html = html.replace(/<ul>/g, '<ul class="list-disc pl-5 my-2 space-y-1">');
    html = html.replace(/<li>/g, '<li class="text-slate-700 dark:text-slate-300">');
    
    // Ajouter des styles pour les paragraphes
    html = html.replace(/<p>/g, '<p class="my-2">');
    
    // Mettre en évidence les termes juridiques
    html = html.replace(/\b(clause|article|section|paragraphe|contrat|condition|résiliation|remboursement)\b/gi, 
      '<span class="text-purple-600 dark:text-purple-400 font-medium">$1</span>');
    
    return html;
  }
}
