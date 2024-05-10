import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {Apartment} from 'src/app/common/models/Apartment';

@Component({
  selector: 'ts-available-apartment-full-info',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './available-apartment-full-info.component.html',
  styleUrl: './available-apartment-full-info.component.scss'
})
export class AvailableApartmentFullInfoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Apartment,
  ) {
  }
}
