"use client";

import dynamic from 'next/dynamic';

const ChatPage = dynamic(() => import('../../components/ChatPage'), {
  ssr: false, // Désactiver le rendu côté serveur
});

export default function Chat() {
  return <ChatPage />;
}