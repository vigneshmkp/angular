
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class RestApiService {


  apiURL = 'http://localhost:8080/student/';
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    })
  }
  constructor(private http: HttpClient) { }

  addDetails(data : any): Observable<any> {
   
    return this.http.post<any>(this.apiURL + 'addStudent',data, this.httpOptions);

  }

  getAllDetails(): Observable<any> {   
		
		return this.http.get<any>(this.apiURL + 'getAll', this.httpOptions)
	
	}

 findByvalue(id : any): Observable<any> {   
		
		return this.http.get<any>(this.apiURL + 'getById/'+id, this.httpOptions)
	
	}

  updateDetails(data : any): Observable<any> {
   
    return this.http.post<any>(this.apiURL + 'editStudent',data, this.httpOptions);

  }
}
