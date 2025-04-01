<script>
    import ChatBox from "$lib/components/ChatBox.svelte";
    import Welcome from "$lib/components/Welcome.svelte";
</script>

<Welcome>
    <div class="app-container">
        <ChatBox />
    </div>
</Welcome>

<style>
    /* 🔥 Correction : appliquer le style au wrapper principal */
    .app-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
    }
</style>
