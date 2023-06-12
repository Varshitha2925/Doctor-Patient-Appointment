import { Component } from '@angular/core';
import { PatientService } from '../shared/Services/patient.service';


@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent {
  public dataSource$: any;
  public appointment:any
  public displayedColumns: string[] = ['Doctor', 'AppointmentDate', 'BookingDate', 'Status','Action'];
  constructor(private data:PatientService){
    this.dataSource$ = [{Doctor: "sduydf" , AppointmentDate: "jbskfgeiruv" , BookingDate: "kbjfeb" , Status:"skugf"}]
    this.getAppointments()
  }

  getAppointments(){
    this.data.getUserApoointment().subscribe((data)=>{
      console.log(data.data)
      this.dataSource$ = data.data
    })
  }

  downloadPrescription(appointmentId:any){
    console.log("Hello")
    console.log("appointmentId",appointmentId)
    this.data.downloadPrescription(appointmentId).subscribe((data)=>{
      console.log(data)
    })
  }

}