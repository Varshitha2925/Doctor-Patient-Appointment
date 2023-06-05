import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) {
  }

  getAlldoctors():Observable<any>{
    console.log("Hello")
    return this.http.get("http://localhost:3000/api/users/getAllDoctors")
  }

}
