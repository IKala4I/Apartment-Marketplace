import {Component, Input} from '@angular/core';
import {Apartment} from 'src/app/common/models/Apartment';
import {
  AvailableApartmentItemComponent
} from 'src/app/dashboard/components/available-apartments/available-apartment-list/available-apartment-item/available-apartment-item.component';

@Component({
  selector: 'ts-available-apartment-list',
  standalone: true,
  imports: [
    AvailableApartmentItemComponent
  ],
  templateUrl: './available-apartment-list.component.html',
  styleUrl: './available-apartment-list.component.scss'
})
export class AvailableApartmentListComponent {
  @Input() apartments: Apartment[];
}
