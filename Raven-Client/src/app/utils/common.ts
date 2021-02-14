import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CommonUtils {
    constructor() { }

    public get headers() {
        const token = localStorage.getItem('token');
        const header = new HttpHeaders({
            "authorization": "Bearer " + token
        });
        return header;
    }
}