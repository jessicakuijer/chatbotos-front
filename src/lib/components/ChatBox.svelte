<script>
  import { onMount, tick} from "svelte";
  import { chatHistory, sendMessage, isThinking, clearChatHistory } from "../stores/chatStore";

  let message = "";

  // Calculer la moyenne des émotions récentes
  $: averageEmotionScore = $chatHistory.length > 0
    ? ($chatHistory.slice(-5).reduce((sum, msg) => sum + (msg.emotion_score || 0), 0) / Math.min(5, $chatHistory.length)).toFixed(2)
    : "N/A";

  // Adapter le ton affiché à l'utilisateur
  $: adaptiveTone = averageEmotionScore > 0.7
    ? "Ton actuel : Très empathique 💙"
    : averageEmotionScore > 0.4
    ? "Ton actuel : Légèrement empathique 😊"
    : "Ton actuel : Neutre et conversationnel 🗣️";

    const handleSend = async () => {
    if (message.trim()) {
      let tempMessage = message; // 🔥 Stocke temporairement le message
      message = "";  // 🔥 Efface immédiatement l'input
      await tick();  // 🔥 Force la mise à jour du DOM avant de continuer

      await sendMessage(tempMessage); // 🔥 Envoie le message à l'IA
    }
  };
</script>
  
  <!-- 🌡️ Score émotionnel et tonalité affichée au-dessus du chat -->
<div class="emotion-container">
    <div class="emotion-adaptive">
        {adaptiveTone}
    </div>
    <div class="emotion-average">
        Score moyen des émotions récentes : <strong>{averageEmotionScore}</strong>
    </div>
</div>

<!-- 📜 Fenêtre de chat -->
<div class="chat-container">
    <div class="chat-messages">
        {#each $chatHistory as msg}
          <div class="message {msg.role}">
            <span>{msg.content}</span>
            {#if msg.emotion_score !== null && msg.emotion_score !== undefined}
                <small class="emotion-score">
                    Score émotionnel: {(msg.emotion_score ?? 0).toFixed(2)}
                </small>
            {/if}
          </div>
        {/each}
      
        {#if $isThinking}
          <div class="thinking">
            <span></span>
            <span></span>
            <span></span>
          </div>
        {/if}
    </div>
    <!-- ⌨️ Barre de saisie fixée en bas du chat -->
<div class="chat-input">
    <input type="text" bind:value={message} on:keydown={(e) => e.key === 'Enter' && handleSend()} placeholder="Écris un message..." />
    <button on:click={handleSend}>Envoyer</button>
    <button on:click={clearChatHistory} class="reset-btn">🔄 Réinitialiser</button>
</div>

</div>

  
  <style>
    /* 🖥️ Fond d'écran dynamique */
  :global(body) {
    background: linear-gradient(135deg, #d16ba5, #86a8e7, #5ffbf1);
    background-size: 400% 400%;
    animation: gradientBG 10s ease infinite;
    font-family: 'Inter', sans-serif;
  }

  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  /* 📜 Zone des messages */
  .chat-messages {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
    max-height: calc(100% - 60px);
  }

  /* ⌨️ Barre d'entrée bien positionnée */
  .chat-input {
    display: flex;
    align-items: center;
    border-radius: 10px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    position: absolute;
    bottom: 10px; /* 🔥 Laisse un petit espace */
    left: 50%;
    transform: translateX(-50%); /* 🔥 Centre horizontalement */
    width: 90%;
    max-width: 480px;
    z-index: 30; /* 🔥 Assure que l'input est au-dessus des autres éléments */
  }

  input {
    flex-grow: 1;
    border: none;
    background: transparent;
    padding: 10px;
    color: white;
    font-size: 16px;
  }

  input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  button {
    border: none;
    background: rgba(255, 255, 255, 0.3);
    padding: 10px 15px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s;
  }

  button:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  /* 🔄 Responsive pour mobile */
  @media screen and (max-width: 600px) {
    .chat-container {
      width: 95%;
      height: 90vh;
    }
    
    .chat-input {
      width: 95%;
      bottom: 5px;
    }
  }

  /* 🔴 Effet de pulsation quand l'IA réfléchit */
  .thinking {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .thinking span {
    width: 8px;
    height: 8px;
    margin: 0 4px;
    background-color: white;
    border-radius: 50%;
    animation: pulse 1.5s infinite ease-in-out;
  }

  @keyframes pulse {
    0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
    40% { transform: scale(1); opacity: 1; }
  }
  .reset-btn {
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 5px 10px;
    margin-left: 5px;
    cursor: pointer;
    border-radius: 5px;
  }

  .reset-btn:hover {
    background-color: #cc0000;
  }

  .emotion-score {
    font-size: 12px;
    color: #888;
    display: block;
    margin-top: 2px;
  }

   /* 🌡️ Conteneur du score émotionnel */
   /* 🌡️ Conteneur des scores émotionnels */
  .emotion-container {
    position: absolute;
    top: 10px; /* 🔥 Positionné tout en haut */
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    padding: 8px 15px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    color: white;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    z-index: 20; /* 🔥 Plus haut que le chat */
  }

  .emotion-adaptive {
    margin-bottom: 5px;
  }

  /* 💡 Ajuster la position du chat pour ne pas le cacher */
  .chat-container {
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 500px;
    max-width: 90%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: calc(80vh - 60px); /* 🔥 Ajuste la hauteur pour laisser de la place à l'input */
  }

  .chat-messages {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
    max-height: calc(100% - 60px);
  }

  /* 📜 Messages de l'utilisateur */
  .message.user {
    align-self: flex-end;
    background: linear-gradient(135deg, #6a11cb, #2575fc); /* Dégradé bleu-violet */
    color: white;
    padding: 12px;
    border-radius: 15px;
    max-width: 75%;
    word-wrap: break-word;
    text-align: right;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }

  /* 📜 Messages de l'IA */
  .message.assistant {
    align-self: flex-start;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 12px;
    border-radius: 15px;
    max-width: 75%;
    word-wrap: break-word;
    text-align: left;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }

  .message {
    padding: 10px 15px;
    margin: 8px 0;
    border-radius: 20px;
    max-width: 75%;
    word-wrap: break-word;
    display: inline-block;
  }

  .user {
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    color: white;
    text-align: right;
    align-self: flex-end;
  }

  .assistant {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    text-align: left;
    align-self: flex-start;
  }

  /* 🔄 Responsive pour mobile */
  @media screen and (max-width: 600px) {
    .chat-container {
      width: 95%;
      height: 85vh;
      top: 90px;
    }

    .chat-input {
      width: 95%;
      bottom: 5px;
    }

    .emotion-container {
      font-size: 12px;
      padding: 5px 10px;
    }
  }
  </style>  