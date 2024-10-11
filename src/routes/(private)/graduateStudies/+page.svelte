<script lang="ts">
	import type { GraduateStudy } from '$lib/models/graduateStudy.model';
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell , Button, Popover, Modal } from 'flowbite-svelte';
	import { get ,Delete} from '@services/http/httpClient';
	import { onMount } from 'svelte';
	import Loader from '$lib/components/Loader.svelte';
    import { PlusOutline , ExclamationCircleOutline} from 'flowbite-svelte-icons';

    let graduateStudies:GraduateStudy[]=[] ;
    let isLoading = true;
    let popupModal = false;
    const textLong = 50;
    onMount(async () =>{
        await getGraduateStudies();
    })

    const getGraduateStudies = async () =>{
        isLoading = true;
        graduateStudies = (await get('graduateStudy')) as GraduateStudy[];
        isLoading = false;
    }

    const isLong = (text:string)=> (text?.length ?? 0) > textLong;
     
    const proccesTextDetail = (text:string)=>{
        if(!text)
            return 'No hay resumen';
        else if(isLong(text)){
            return text.substring(0, textLong) + '...'
        }
        return text;
    }

    const deleteProgram = async (id:string)=>{
        await Delete("graduateStudy/"+id);
        await getGraduateStudies();
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
                    <TableBodyCell>
                        <Button href="/graduateStudies/{graduateStudy.id}">Editar</Button>
                        <Button on:click={() => (popupModal = true)} class="ml-2" color="red">Eliminar</Button>
                        <Modal bind:open={popupModal} size="xs" autoclose>
                            <div class="text-center">
                              <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Estas seguro de eliminar el programa de posgrado?</h3>
                              <Button color="red" class="me-2" on:click={()=> deleteProgram(graduateStudy.id)}>Si, eliminar</Button>
                              <Button color="alternative">No, cancelar</Button>
                            </div>
                          </Modal>
                    </TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
      </Table>
</Loader>

