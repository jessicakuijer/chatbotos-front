<script>
    import { onMount } from "svelte";
    let showChat = false;
  
    function startChat() {
      showChat = true;
    }
  </script>
  
  {#if !showChat}
    <div class="welcome-screen">
      <h1>Bienvenue</h1>
      <p>Prêt à discuter ?</p>
      <button on:click={startChat}>Lancer l’assistant</button>
    </div>
  {:else}
    <slot />
  {/if}
  
  <style>
    .welcome-screen {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: white;
      font-size: 24px;
    }
  
    button {
      margin-top: 20px;
      background: rgba(255, 255, 255, 0.3);
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 18px;
    }
  
    button:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  </style>
  