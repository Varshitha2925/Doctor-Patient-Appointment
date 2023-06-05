import { Component } from '@angular/core';


@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent {
  public dataSource$: any;
  public displayedColumns: string[] = ['Doctor', 'AppointmentDate', 'BookingDate', 'Status','Action'];
  constructor(){
    this.dataSource$ = [{Doctor: "sduydf" , AppointmentDate: "jbskfgeiruv" , BookingDate: "kbjfeb" , Status:"skugf"}]
  }

}