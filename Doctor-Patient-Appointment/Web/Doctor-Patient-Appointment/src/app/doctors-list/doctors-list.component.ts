import { Component } from '@angular/core';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent {
  list:any
  constructor(){
    this.list = [{
      doctor : "Jack",
      specialization : "Cardio",
      experience: "5 years",
      feesperConsultation: "1000"
    }]
  }

}
