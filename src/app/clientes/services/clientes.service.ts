import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cliente } from '../models/Cliente';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type' : 'application/json'
    })
}

@Injectable({
    providedIn: 'root'
})
export class ClientesService {
    url = 'https://localhost:44344/api/clientes';

    constructor(private http: HttpClient) {}

    GetClientes(): Observable<Cliente[]>{
        return this.http.get<Cliente[]>(this.url)
    }

    GetCliente(id: number): Observable<Cliente> {
        const apiUrl = `${this.url}/${id}`;
        return this.http.get<Cliente>(apiUrl);
      }

      GetClientesByName(): Observable<object[]>{
        return this.http.get<object[]>(this.url + "/clientes_by_name")
    }
    
      PostCliente(cliente: Cliente): Observable<any> {
        return this.http.post<Cliente>(this.url, cliente, httpOptions);
      }
    
      PutCliente(cliente: Cliente): Observable<any> {
        return this.http.put<Cliente>(this.url, cliente, httpOptions);
      }
    
      DeleteCliente(id: number): Observable<any> {
        const apiUrl = `${this.url}/${id}`;
        return this.http.delete<number>(apiUrl, httpOptions);
      }
}