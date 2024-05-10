import { Component } from '@angular/core';
import {TitleComponent} from 'src/app/common/components/title/title.component';
import {CreateApartmentComponent} from 'src/app/dashboard/components/create-apartment/create-apartment.component';

@Component({
  selector: 'ts-dashboard',
  standalone: true,
  imports: [
    TitleComponent,
    CreateApartmentComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
