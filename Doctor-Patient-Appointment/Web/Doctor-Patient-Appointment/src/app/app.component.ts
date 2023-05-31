import { Component } from '@angular/core';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Doctor-Patient-Appointment';
  iconUrl ="https://www.innovasolutions.com/wp-content/uploads/2022/08/favicon-32x32-1.png";
  constructor(private ngxFavicon: AngularFaviconService){
  }
  ngOnInit() {
    this.ngxFavicon.setFavicon(this.iconUrl);
  }
}
