import { Component } from '@angular/core';
import {TitleComponent} from 'src/app/common/components/title/title.component';
import {BoxWrapperComponent} from 'src/app/common/components/box-wrapper/box-wrapper.component';
import {
  CreateApartmentFormComponent
} from 'src/app/dashboard/components/create-apartment/create-apartment-form/create-apartment-form.component';

@Component({
  selector: 'ts-create-apartment',
  standalone: true,
  imports: [
    TitleComponent,
    BoxWrapperComponent,
    CreateApartmentFormComponent
  ],
  templateUrl: './create-apartment.component.html',
  styleUrl: './create-apartment.component.scss'
})
export class CreateApartmentComponent {

}
