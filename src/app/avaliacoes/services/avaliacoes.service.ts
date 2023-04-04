import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Avaliacao } from '../models/Avaliacao';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type' : 'application/json'
    })
}

@Injectable({
    providedIn: 'root'
})
export class AvaliacoesService {
    url = 'https://localhost:44344/api/avaliacoes';

    constructor(private http: HttpClient) {}

    GetAvaliacoes(): Observable<Avaliacao[]>{
        return this.http.get<Avaliacao[]>(this.url)
    }

    GetAvaliacao(id: number): Observable<Avaliacao> {
        const apiUrl = `${this.url}/${id}`;
        return this.http.get<Avaliacao>(apiUrl);
      }
    
      PostAvaliacao(avaliacao: Avaliacao): Observable<any> {
        return this.http.post<Avaliacao>(this.url, avaliacao, httpOptions);
      }
    
      PutAvaliacao(avaliacao: Avaliacao): Observable<any> {
        return this.http.put<Avaliacao>(this.url, avaliacao, httpOptions);
      }
    
      DeleteAvaliacao(id: number): Observable<any> {
        const apiUrl = `${this.url}/${id}`;
        return this.http.delete<number>(apiUrl, httpOptions);
      }
}