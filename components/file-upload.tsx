"use client"
import React, { useState, useRef } from 'react';
import { FileText, Image, X, Eye, Download, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import '../styles/file-upload.css';

interface FileData {
  id: string;
  name: string;
  type: string;
  size: number;
  content: string;
  preview?: string;
}

interface FileUploadProps {
  onFileSelect: (fileData: FileData) => void;
  onRemoveFile: (fileId: string) => void;
  uploadedFiles: FileData[];
  isOpen: boolean;
  onToggle: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileSelect, 
  onRemoveFile, 
  uploadedFiles, 
  isOpen, 
  onToggle 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter(file => {
      // Limiter les types de fichiers acceptés
      const allowedTypes = [
        'application/pdf',
        'text/plain',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp'
      ];
      return allowedTypes.includes(file.type) && file.size <= 10 * 1024 * 1024; // 10MB max
    });

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const fileData: FileData = {
          id: Date.now() + Math.random().toString(),
          name: file.name,
          type: file.type,
          size: file.size,
          content: result,
          preview: file.type.startsWith('image/') ? result : undefined
        };
        onFileSelect(fileData);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

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
    <>
      {/* Zone de drop globale améliorée */}
      <AnimatePresence>
        {isDragOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10 backdrop-blur-md flex items-center justify-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-2 border-dashed border-blue-400 rounded-3xl p-16 text-center max-w-md mx-4 shadow-2xl"
            >
              {/* Icône animée */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="mb-6"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Paperclip className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              {/* Texte principal */}
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
                Déposez vos fichiers ici
              </h3>
              
              {/* Description */}
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                PDF, Images, Documents texte
              </p>
              
              {/* Limite de taille */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                  Maximum 10MB par fichier
                </span>
              </div>

              {/* Particules décoratives */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton d'upload amélioré */}
      <div className="relative">
        <motion.button
          onClick={() => {
            if (isOpen) {
              fileInputRef.current?.click();
            } else {
              onToggle();
            }
          }}
          className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 overflow-hidden border-2 ${
            isOpen 
              ? 'text-blue-600 dark:text-blue-400 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 shadow-lg ring-2 ring-blue-200 dark:ring-blue-700 border-blue-300 dark:border-blue-600' 
              : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 hover:shadow-md border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600'
          }`}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          title="Joindre un fichier"
        >
          {/* Effet de fond animé */}
          {isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full"
            />
          )}
          
          <motion.div
            animate={{ 
              rotate: isOpen ? 45 : 0,
              scale: isOpen ? 1.1 : 1
            }}
            transition={{ 
              duration: 0.3,
              type: "spring",
              stiffness: 300
            }}
            className="relative z-10"
          >
            <Paperclip className="w-6 h-6" />
          </motion.div>
        </motion.button>

        {/* Indicateur de fichiers uploadés amélioré */}
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white dark:ring-slate-800"
          >
            <motion.span 
              className="text-xs font-bold text-white"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              {uploadedFiles.length}
            </motion.span>
          </motion.div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.txt,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* Menu des fichiers uploadés - Version améliorée et plus large */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-0 right-0 mb-3 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl backdrop-blur-md max-h-48 overflow-hidden min-w-[280px]"
            style={{ 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5)'
            }}
          >
            {/* Header avec gradient amélioré - Plus compact */}
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-800 dark:via-slate-750 dark:to-slate-700 px-4 py-3 border-b border-slate-200/50 dark:border-slate-600/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Fichiers joints
                  </h4>
                  <motion.div 
                    className="px-2 py-0.5 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                  >
                    {uploadedFiles.length}
                  </motion.div>
                </div>
                <button
                  onClick={onToggle}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Liste des fichiers avec scroll personnalisé */}
            <div className="max-h-40 overflow-y-auto custom-scrollbar p-3 space-y-2">
              {uploadedFiles.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className="group relative bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-3 border border-slate-200 dark:border-slate-600 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  {/* Indicator de type de fichier */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className={`w-3 h-3 rounded-full shadow-lg ${
                      file.type.startsWith('image/') ? 'bg-green-400' :
                      file.type === 'application/pdf' ? 'bg-red-400' :
                      'bg-blue-400'
                    }`}></div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* Thumbnail amélioré et plus compact */}
                    <div className="relative flex-shrink-0">
                      {file.preview ? (
                        <div className="relative group/thumb">
                          <img
                            src={file.preview}
                            alt={file.name}
                            className="w-10 h-10 object-cover rounded-lg cursor-pointer ring-2 ring-transparent group-hover/thumb:ring-blue-400 transition-all duration-300 shadow-md"
                            onClick={() => handleFilePreview(file)}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/thumb:bg-opacity-20 rounded-lg transition-all duration-300 flex items-center justify-center">
                            <Eye className="w-4 h-4 text-white opacity-0 group-hover/thumb:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ) : (
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ring-2 ring-transparent group-hover:ring-blue-400 transition-all duration-300 shadow-md ${
                          file.type === 'application/pdf' 
                            ? 'bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30' 
                            : 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30'
                        }`}>
                          <FileText className={`w-5 h-5 ${
                            file.type === 'application/pdf' 
                              ? 'text-red-600 dark:text-red-400' 
                              : 'text-blue-600 dark:text-blue-400'
                          }`} />
                        </div>
                      )}
                    </div>
                    
                    {/* Informations du fichier - Plus compactes */}
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    
                    {/* Actions - Seulement supprimer et aperçu */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      {(file.preview || file.type === 'application/pdf') && (
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleFilePreview(file)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200"
                          title="Aperçu"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onRemoveFile(file.id)}
                        className="p-1.5 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
                        title="Supprimer"
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Barre de progression avec effet de gradient - Plus fine */}
                  <div className="mt-1 h-0.5 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="h-full gradient-flow rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FileUpload;
