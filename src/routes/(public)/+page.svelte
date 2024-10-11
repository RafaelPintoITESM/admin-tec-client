<script lang="ts">
    import { goto } from '$app/navigation';
    import {post} from '@services/http/httpClient'
  import { 
    Toast , 
    Button, 
    Card,
    Label, 
    Input,
    DarkMode, 
  } from 'flowbite-svelte';
  import { slide } from 'svelte/transition';
  import { CloseCircleOutline } from 'flowbite-svelte-icons';
    let email = '';
    let password = '';
    let toastStatus = false;
    let counter = 6;
    let error = '';
      async function handleSubmit(event:any) {
        event.preventDefault();
        const data = await post('auth/login',{ email: email, password });
        if(data?.error){
          error = data.error;
          toastStatus = true;
          counter = 6;
          timeout();
        }
        else{
          localStorage.setItem('token', data.token);
          goto('/home');
        }

      // Aquí puedes agregar la lógica de autenticación
    }

    
  function timeout() {
    if (--counter > 0) return setTimeout(timeout, 1000);
    toastStatus = false;
  }
  </script>
  <div class="flex gap-10">
    <Toast dismissable={true} transition={slide} position="top-right" bind:toastStatus color="red">
      <CloseCircleOutline slot="icon" class="w-5 h-5" />
      {error}
    </Toast>
  </div>
  <div class="flex justify-center items-center h-screen bg-white dark:bg-gray-950 text-black dark:text-white w-full">
    <div class="w-full max-w-md ">      
      <Card >
        <form class="flex flex-col space-y-6" on:submit={handleSubmit}>
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">Login 
            <DarkMode/></h3>
          <Label class="space-y-2">
            <span>Email</span>
            <Input type="email" name="email" placeholder="name@company.com" required  bind:value={email}/>
          </Label>
          <Label class="space-y-2">
            <span>Password</span>
            <Input  type="password" name="password" placeholder="•••••" required bind:value={password}/>
          </Label>
          <Button type="submit" class="w-full">Iniciar sesión</Button>
        </form>
      </Card>
    </div>
  </div>
  