"use client"
import React from 'react';
import { FileText, Image, Eye, Download } from 'lucide-react';
import { motion } from 'motion/react';
import MessageRenderer from './message-renderer';

interface FileData {
  id: string;
  name: string;
  type: string;
  size: number;
  content: string;
  preview?: string;
}

interface MessageWithFilesProps {
  message: {
    type: string;
    content: string;
    timestamp: string;
    files?: FileData[];
    indicator?: string;
    analysisType?: string;
  };
}

const MessageWithFiles: React.FC<MessageWithFilesProps> = ({ message }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFilePreview = (file: FileData) => {
    if (file.type.startsWith('image/')) {
      window.open(file.content, '_blank');
    } else if (file.type === 'application/pdf') {
      window.open(file.content, '_blank');
    }
  };

  const handleFileDownload = (file: FileData) => {
    const link = document.createElement('a');
    link.href = file.content;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="message-with-files">
      {/* Affichage des fichiers si présents */}
      {message.files && message.files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 space-y-2"
        >
          {message.files.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700"
            >
              <div className="flex-shrink-0">
                {file.preview ? (
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-12 h-12 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleFilePreview(file)}
                  />
                ) : (
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {formatFileSize(file.size)}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                {(file.preview || file.type === 'application/pdf') && (
                  <button
                    onClick={() => handleFilePreview(file)}
                    className="p-2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    title="Aperçu"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleFileDownload(file)}
                  className="p-2 text-slate-500 hover:text-green-600 dark:hover:text-green-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  title="Télécharger"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Contenu du message */}
      {message.content && (
        <div className="message-content">
          {message.type === "ai" ? (
            <MessageRenderer 
              content={message.content} 
              messageType={message.analysisType}
            />
          ) : (
            <MessageRenderer 
              content={message.content} 
              messageType="user"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MessageWithFiles;
