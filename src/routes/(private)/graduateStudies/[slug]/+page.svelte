<script lang="ts">
    import { page } from '$app/stores';
    import { Label, Input, Textarea ,Button, Toast, Fileupload } from 'flowbite-svelte';
	import { get,post, postForm } from '@services/http/httpClient';
	import { onMount } from 'svelte';
  import { goto } from '$app/navigation';  // Redirección dentro de SvelteKit
	import Loader from '$lib/components/Loader.svelte';
	import type { GraduateStudy } from '$lib/models/graduateStudy.model';
	import { CheckCircleSolid } from 'flowbite-svelte-icons';
  import { slide } from 'svelte/transition';
  
  // Acceder al parámetro slug
     $: id = $page.params.slug;
    let message = '';    
    let toastStatus = false;
    let counter = 6;
    let graduateStudy:GraduateStudy ={
        id: id == '0' ? generateUUID() : id,
        name: '',
        information: '',
        detail: ''
    } ;
    let selectedFiles:any;
    let isLoading = true;
    onMount(async () =>{
        if(id != '0'){
            graduateStudy = await get('graduateStudy/'+id);
        }
        isLoading = false;
    })
    const handleSubmit = async () =>{
        console.log(graduateStudy);
        const response = await post('graduateStudy',graduateStudy)       
        message = response.message;
        toastStatus = true;
        counter = 6;
        timeout();
        setTimeout(() => {            
            goto("/graduateStudies")
        }, 1000);
    }

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    function timeout() {
        if (--counter > 0) return setTimeout(timeout, 1000);
        toastStatus = false;
    }

    const extractFile = async ()=>{        
        const formData = new FormData();
        formData.append('pdfFile', selectedFiles[0]);
        const response = await postForm('pdf/extract', formData);
        graduateStudy.information = response.text;
    }
</script>
  
<h1 class="text-xl mb-5" > Detalle de Posgrado</h1>

<div class="flex gap-10">
    <Toast dismissable={true} transition={slide} position="top-right" bind:toastStatus>
      <CheckCircleSolid slot="icon" class="w-5 h-5" />
      {message}
    </Toast>
  </div>
<Loader bind:isLoading >
    <form  on:submit={handleSubmit}>
        <Label class="space-y-2">
            <span>Programa de posgrado</span>
            <Input type="text" placeholder="Nombre de programa" required  bind:value={graduateStudy.name}/>
          </Label>
          <Label class="space-y-2 mt-4">
            <span>Detalles</span>
            <Textarea  type="text" placeholder="Resumen del programa..." rows=3 required  bind:value={graduateStudy.detail}/>
          </Label>
          <Label class="space-y-2 mt-4">
            <span>Información</span>
            <div class="grid grid-cols-4 gap-4">
                <div class="col-span-3">
                    <Fileupload bind:files={selectedFiles} />
                </div>
                <div class="">
                  <Button class="w-full" on:click={extractFile}>Extraer</Button>
                </div>
            </div>
            <Textarea  type="text" placeholder="Información del programa..." rows=10 required  bind:value={graduateStudy.information}/>
          </Label>
      
          <Button color="green" class="w-full mt-4" type="submit"> Guardar</Button>
    </form>
</Loader>