<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';  // Redirección dentro de SvelteKit
	import {
		DarkMode,
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		Modal,
		Button
	} from 'flowbite-svelte';
  import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
  
	let width: number;
  let popupModal = false;

  onMount(() => {
    const token = localStorage.getItem('token');
    if(!token || token == 'undefined') {
      logout();
    }
	});
  const logout = ()=>{
      localStorage.removeItem('token');
      goto('/');
  }
	let activeUrl = $page.url.pathname;
	let divClass = 'w-full ml-auto lg:block lg:w-auto order-1 lg:order-none ';
	let ulClass =
		'flex flex-col py-3 my-4 lg:flex-row lg:my-0 text-sm font-medium gap-4 dark:lg:bg-transparent lg:bg-gray-200 lg:border-0';
</script>

<svelte:window bind:innerWidth={width} />
<div class="flex flex-col h-screen">
  <!-- Header con tamaño fijo -->
  <header class="flex-none w-full">
    <Navbar let:hidden class="bg-gray-200">
      <NavBrand href="/" class="lg:ml-64">
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white pl-4">
          Admin TEC
        </span>
      </NavBrand>
      <NavUl
        {hidden}
        {divClass}
        {ulClass}
        nonActiveClass="md:!pl-3 md:!py-2 lg:!pl-0 text-gray-700 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-white lg:dark:hover:text-primary-700 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
        activeClass="md:!pl-3 md:!py-2 lg:!pl-0 lg:text-primary-700 text-white dark:text-white dark:lg:text-primary-500 bg-primary-700 lg:bg-transparent dark:bg-primary-600 lg:dark:bg-transparent cursor-default"
      >
        <NavLi class="lg:px-2 lg:mb-0" active={activeUrl === '/home'} href="/home">Home</NavLi>
        <NavLi class="lg:px-2 lg:mb-0" active={activeUrl === '/graduateStudies'} href="/graduateStudies">
          Programas de Posgrado
        </NavLi>
      </NavUl>
      <div class="flex items-center ml-auto">
        <DarkMode class="inline-block dark:hover:text-white hover:text-gray-900" />
      </div>
      <Button on:click={() => (popupModal = true)} class="ml-10">Salir</Button>
    </Navbar>
  </header>

  <!-- Contenido que ocupa el espacio restante -->
  <div class="flex-grow bg-white dark:bg-gray-800 text-black dark:text-white w-full">
    <main class="w-full px-4 py-4 mx-auto overflow-y-auto">
      <slot />
    </main>
  </div>
</div>


<Modal bind:open={popupModal} size="xs" autoclose>
  <div class="text-center">
    <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Estas seguro de cerrar sesión?</h3>
    <Button color="red" class="me-2" on:click={logout}>Si, salir</Button>
    <Button color="alternative">No, cancelar</Button>
  </div>
</Modal>