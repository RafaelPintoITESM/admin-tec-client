import type { GraduateStudy } from "$lib/models/graduateStudy.model";
import {get,post,put,Delete} from "@services/http/httpClient";

const pathRoute = "graduateStudy";
export const graduateStudyRepository = {
    async getAll():Promise<GraduateStudy[]>{
        const response = await get(pathRoute);
        return response as GraduateStudy[];
    },
    async getById(id:string): Promise<GraduateStudy>{
        const response = await get(pathRoute + "/" + id);
        return response as GraduateStudy;
    },
    async create(item: GraduateStudy){
        const response = await post(pathRoute, item);
        return response;
    },
    async update(item: GraduateStudy){
        const response = await put(pathRoute,item.id, item);
        return response;
    },
    async delete(id: string){
        const response = await Delete(pathRoute + "/" + id);
        return response;
    },
}