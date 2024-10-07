<script lang="ts">
	import type { GraduateStudy } from '$lib/models/graduateStudy.model';
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell , Button, Popover } from 'flowbite-svelte';
	import { get } from '@services/http/httpClient';
	import { onMount } from 'svelte';
	import Loader from '$lib/components/Loader.svelte';
    import { PlusOutline } from 'flowbite-svelte-icons';

    let graduateStudies:GraduateStudy[]=[] ;
    let isLoading = true;
    const textLong = 50;
    onMount(async () =>{
        graduateStudies = (await get('graduateStudy')) as GraduateStudy[];
        isLoading = false;
    })

    const isLong = (text:string)=> (text?.length ?? 0) > textLong;
     
    const proccesTextDetail = (text:string)=>{
        if(!text)
            return 'No hay resumen';
        else if(isLong(text)){
            return text.substring(0, textLong) + '...'
        }
        return text;
    }

</script>
  
<div class="flex items-center justify-between mb-4">
    <h1 class="text-xl">Programas de Posgrado</h1>
    <Button class="ml-auto" color="blue" href="/graduateStudies/0"><PlusOutline/></Button>
  </div>

<Loader bind:isLoading>
    <Table>
        <TableHead>
          <TableHeadCell>Nombre</TableHeadCell>
          <TableHeadCell>Resumen</TableHeadCell>
          <TableHeadCell>Opciones</TableHeadCell>
        </TableHead>
        <TableBody tableBodyClass="divide-y">
            {#each graduateStudies as graduateStudy}
                <TableBodyRow>
                    <TableBodyCell>{graduateStudy.name}</TableBodyCell>
                    <TableBodyCell>
                        {#if isLong(graduateStudy.detail)}
                            <Popover class="w-100 text-sm font-light text-black dark:text-white" title="Resumen" triggeredBy="#b1-{graduateStudy.id}">
                                {graduateStudy.detail}
                            </Popover>
                        {/if}
                        <p id="b1-{graduateStudy.id}"> {proccesTextDetail(graduateStudy.detail)}</p>                       
                    </TableBodyCell>
                    <TableBodyCell><Button href="/graduateStudies/{graduateStudy.id}">Editar</Button></TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
      </Table>
</Loader>