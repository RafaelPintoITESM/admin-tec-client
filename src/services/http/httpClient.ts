import {config} from '@/config'
import { goto } from '$app/navigation';  // Redirección dentro de SvelteKit

export async function get(route:string){
    let token = localStorage.getItem('token');
    const response = await fetch(`${config.urlAPI}/${route}`, {
        method: 'GET',
        headers: { 
          'Authorization': 'Bearer ' + token
        }
      });
      if(response.status == 401){
        localStorage.removeItem('token');
        goto("/")
      }
      console.log(response)
      return await response.json();
}

export async function post(route:string ,body:any){
  let token = localStorage.getItem('token');
    const response = await fetch(`${config.urlAPI}/${route}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body)
      });
      return await response.json();
}
export async function postForm(route:string ,body:FormData){
  let token = localStorage.getItem('token');
    const response = await fetch(`${config.urlAPI}/${route}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: body
      });
      return await response.json();
}

export async function Delete(route:string ,body:any){
  let token = localStorage.getItem('token');
    const response = await fetch(`${config.urlAPI}/${route}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body)
      });
      return await response.json();
}

