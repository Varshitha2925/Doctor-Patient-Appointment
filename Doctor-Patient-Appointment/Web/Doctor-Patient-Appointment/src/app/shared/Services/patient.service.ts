import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public appointmentId:any
  constructor(private http: HttpClient) {
  }

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

  getUserApoointment():Observable<any>{
    return this.http.get<any>(
      "http://localhost:3000/api/users/user-appointments")
  }

  downloadPrescription(appointmentId:any){
    this.appointmentId = {
      "appointmentId": appointmentId
    }
    console.log("app",appointmentId)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post("http://localhost:3000/api/users/medicationDownload",this.appointmentId)
  }

}
