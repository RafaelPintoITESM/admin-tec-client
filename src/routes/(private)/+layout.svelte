<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';  // Redirección dentro de SvelteKit

  let token;

  onMount(() => {
    token = localStorage.getItem('token');

    if (!token) {
      goto('/');  // Redirigir al login si no hay token
    }
  });

let logout = ()=>{
  localStorage.removeItem('token');
  goto('/')
}
</script>


<div>
  <button
  type="button"
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  on:click={logout}
>
  Cerrar sesión
</button>
</div>
<slot />
