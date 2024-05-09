import { Component } from '@angular/core';
import {TitleComponent} from 'src/app/common/components/title/title.component';

@Component({
  selector: 'ts-dashboard',
  standalone: true,
  imports: [
    TitleComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
