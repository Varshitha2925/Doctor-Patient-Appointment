import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) {
  }

  // getAlldoctors():Observable<any>{
  //   console.log("Hello")
  //   return this.http.get("http://localhost:3000/api/users/getAllDoctors")
  // }

  getAlldoctors(
    search : {
      specialization: string,
      experience: string,
      sort: string
    }): Observable<any> {
    let params = new HttpParams({ fromObject: search });
    console.log("params",params)

    return this.http.get<any>(

      "http://localhost:3000/api/users/getAllDoctors",{params})

  }

}
