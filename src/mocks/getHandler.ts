import { http, HttpResponse } from "msw";
import initialData from '../data.json';

export const getHandler = [
    http.get("/data", () => {
        if(sessionStorage.getItem("data")){
            const results = sessionStorage.getItem("data");
            if(results)
                return HttpResponse.json({
                    results : JSON.parse(results)
                })
        } else {
            sessionStorage.setItem("data", JSON.stringify(initialData))
            return HttpResponse.json({
                results : initialData
            })
        }
    }),

    http.post("/saveData", async ({request}) => {
        const result = await request.json();
        sessionStorage.setItem("data", JSON.stringify(result));

        return HttpResponse.json("Session Storage Updated", {status : 201})
    })
]