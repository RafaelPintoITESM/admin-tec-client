import type { TextProcess } from "$lib/models/textProcess.model";
import { post } from "@services/http/httpClient";

const textProcessService = {
    async organize(text:string){
        const request: TextProcess = {
            text: text
        }
        const response = await post('text/organize', request);
        return response.response;
    }
}

export default textProcessService;