<script>
    export let isActive = false; // Controla la visibilidad del backdrop
    export let message = 'Cargando...';
  </script>
  
  {#if isActive}
    <div class="backdrop fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
      <!-- Spinner -->
      <div class="spinner border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin mb-4"></div>
      <!-- Texto de cargando con animación fade -->
      <p class="text-white text-lg fade-text">{message}</p>
    </div>
  {/if}
  
  <style>
    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999; /* Para asegurarnos de que esté encima de todo */
    }
  
    .spinner {
      border-width: 4px;
      border-style: solid;
      border-color: #f3f3f3 transparent transparent transparent;
      border-radius: 50%;
      width: 64px;
      height: 64px;
      animation: spin 1s linear infinite;
    }
  
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  
    /* Animación de fade-in y fade-out intermitente */
    @keyframes fade {
      0% { opacity: 0; }
      50% { opacity: 1; }
      100% { opacity: 0; }
    }
  
    .fade-text {
      animation: fade 2s infinite; /* Aplica la animación al texto */
    }
  </style>
  