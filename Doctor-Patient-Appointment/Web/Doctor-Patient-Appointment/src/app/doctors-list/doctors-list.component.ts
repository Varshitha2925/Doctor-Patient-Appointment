import { Component, OnInit } from '@angular/core';
import { PatientService } from '../shared/Services/patient.service'

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent implements OnInit{
  list:any
  doctors:any
  constructor(private data : PatientService){
    this.list = [{
      doctor : "Jack",
      specialization : "Cardio",
      experience: "5 years",
      feesperConsultation: "1000"
    }]
  }

  ngOnInit(){
    this.data.getAlldoctors().subscribe((msg) => {
      console.log("msg",msg.data)
      this.list = msg.data
    })
  }
}
