import React from 'react';
import { marked } from 'marked';

interface MessageRendererProps {
  content: string;
  messageType?: string;
}

const MessageRenderer: React.FC<MessageRendererProps> = ({ content, messageType }) => {
  // Configuration de marked pour un rendu sécurisé
  marked.setOptions({
    breaks: true,
    gfm: true,
    sanitize: false, // Nous allons nettoyer manuellement
  });

  // Fonction pour nettoyer et convertir le contenu
  const processContent = (rawContent: string): string => {
    // Remplacer les bullet points markdown par des bullet points HTML
    let processedContent = rawContent
      .replace(/^\* /gm, '• ')
      .replace(/^\- /gm, '• ')
      .replace(/^• /gm, '<li class="custom-bullet-point">• ')
      .replace(/\n(?=• )/g, '</li>\n')
      .replace(/(<li class="custom-bullet-point">• .*?)(?=\n[^•])/gs, '$1</li>');

    // Convertir les ** en balises strong
    processedContent = processedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Gérer les sections avec ### 
    processedContent = processedContent.replace(/^### (.*?)$/gm, '<h3 class="section-title">$1</h3>');
    
    // Gérer les sections avec ##
    processedContent = processedContent.replace(/^## (.*?)$/gm, '<h2 class="main-title">$1</h2>');

    // Nettoyer et structurer les listes
    if (processedContent.includes('<li class="custom-bullet-point">')) {
      processedContent = processedContent.replace(
        /(<li class="custom-bullet-point">.*?<\/li>)/gs, 
        '<ul class="custom-bullet-list">$1</ul>'
      );
    }

    // Ajouter des sauts de ligne pour la lisibilité
    processedContent = processedContent.replace(/\n\n/g, '<br><br>');
    processedContent = processedContent.replace(/\n/g, '<br>');

    return processedContent;
  };

  // Traitement du contenu
  const processedContent = processContent(content);

  return (
    <div 
      className="message-content"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};

export default MessageRenderer;
