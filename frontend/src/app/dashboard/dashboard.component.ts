import { Component } from '@angular/core';
import {TitleComponent} from 'src/app/common/components/title/title.component';
import {CreateApartmentComponent} from 'src/app/dashboard/components/create-apartment/create-apartment.component';
import {
  AvailableApartmentsComponent
} from 'src/app/dashboard/components/available-apartments/available-apartments.component';

@Component({
  selector: 'ts-dashboard',
  standalone: true,
  imports: [
    TitleComponent,
    CreateApartmentComponent,
    AvailableApartmentsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
