<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';  // Redirección dentro de SvelteKit

  let token;

  onMount(() => {
    token = localStorage.getItem('token');

    if (token) {
      goto('/home');  // Redirigir al login si no hay token
    }
  });
</script>
<slot />
