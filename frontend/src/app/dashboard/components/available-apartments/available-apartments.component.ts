import {Component, OnInit} from '@angular/core';
import {TitleComponent} from 'src/app/common/components/title/title.component';
import {BoxWrapperComponent} from 'src/app/common/components/box-wrapper/box-wrapper.component';
import {
  AvailableApartmentsFormComponent
} from 'src/app/dashboard/components/available-apartments/available-apartments-form/available-apartments-form.component';
import {
  AvailableApartmentListComponent
} from 'src/app/dashboard/components/available-apartments/available-apartment-list/available-apartment-list.component';
import {Apartment} from 'src/app/common/models/Apartment';
import {ApartmentService} from 'src/app/common/services/apartment.service';

@Component({
  selector: 'ts-available-apartments',
  standalone: true,
  imports: [
    TitleComponent,
    BoxWrapperComponent,
    AvailableApartmentsFormComponent,
    AvailableApartmentListComponent
  ],
  templateUrl: './available-apartments.component.html',
  styleUrl: './available-apartments.component.scss'
})
export class AvailableApartmentsComponent implements OnInit {
  amount: number = 0;
  apartments: Apartment[] = [];

  constructor(private apartmentService: ApartmentService) {
  }

  ngOnInit() {
    this.apartmentService.getApartments().subscribe(apartments => {
      console.log(apartments);
      this.apartments = apartments;
      this.amount = this.apartmentService.amount;
    });
  }
}
