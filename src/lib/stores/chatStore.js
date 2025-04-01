import { writable } from "svelte/store";

// Charger l'historique depuis localStorage
const getInitialHistory = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    return JSON.parse(localStorage.getItem("chatHistory")) || [];
  }
  return [];
};

// Stocker l’historique
export const chatHistory = writable(getInitialHistory());
export const isThinking = writable(false);

// Fonction pour calculer la moyenne des émotions récentes
const calculateAverageEmotion = (history) => {
  const recentEmotions = history.slice(-5); // Derniers 5 messages
  const avgEmotion = recentEmotions.reduce((sum, msg) => sum + (msg.emotion_score || 0), 0) / recentEmotions.length;
  return avgEmotion.toFixed(2);
};

// Mettre à jour `localStorage` à chaque message ajouté
chatHistory.subscribe((history) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }
});

// Fonction pour envoyer un message et récupérer la réponse avec le score
export const sendMessage = async (message) => {
  chatHistory.update((history) => [...history, { role: "user", content: message, emotion_score: null, timestamp: Date.now() }]);
  isThinking.set(true);

  try {
    const response = await fetch("http://127.0.0.1:8000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: getInitialHistory() }),
    });

    const data = await response.json();
    chatHistory.update((history) => [
        ...history,
        {
          role: "assistant",
          content: data.response,
          emotion_score: data.emotion_score ?? 0, // 🔥 Si null ou undefined, on met 0
          timestamp: Date.now(),
        },
      ]);         

  } catch (error) {
    console.error("Erreur lors de l'envoi du message :", error);
  } finally {
    isThinking.set(false);
  }
};

// Fonction pour réinitialiser la mémoire (y compris les scores d’émotion)
export const clearChatHistory = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem("chatHistory");
  }
  chatHistory.set([]);
};
