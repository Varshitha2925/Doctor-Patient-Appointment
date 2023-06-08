import { Component, OnInit } from '@angular/core';
import { PatientService } from '../shared/Services/patient.service'
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent implements OnInit{
  list:any
  doctors:any
  params:any
  constructor(private data : PatientService){
    this.list = [{
      firstName : "Jack",
      specialization : "Cardio",
      experience: "5 years",
      feesperConsultation: "1000"
    }]
    this.params = {

    }
  }

  ngOnInit(){
    this.getDoctorsList()
  }
  search_by_spec($event:any){
    this.params = {
      ...this.params,
      specialization: $event.target.value
    }
    this.getDoctorsList()
  }
  search_by_experience($event:any){
    this.params = {
      ...this.params,
      experience: $event.target.value
    }
    this.getDoctorsList()
  }
  getDoctorsList(){
    this.data.getAlldoctors(this.params).subscribe((data: any) => {
        console.log(data.data)
        this.list = data.data
        return data.data
      }),
      catchError(() => {
        return of(null);
      })
  }
}
