import {Component, Input} from '@angular/core';
import {BoxWrapperComponent} from 'src/app/common/components/box-wrapper/box-wrapper.component';
import {MatButton} from '@angular/material/button';
import {Apartment} from 'src/app/common/models/Apartment';
import {TruncatePipe} from 'src/app/common/pipes/truncate.pipe';

@Component({
  selector: 'ts-available-apartment-item',
  standalone: true,
  imports: [
    BoxWrapperComponent,
    MatButton,
    TruncatePipe
  ],
  templateUrl: './available-apartment-item.component.html',
  styleUrl: './available-apartment-item.component.scss'
})
export class AvailableApartmentItemComponent {
  @Input() apartment: Apartment;
}
