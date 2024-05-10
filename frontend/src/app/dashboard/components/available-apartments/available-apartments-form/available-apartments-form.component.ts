import {Component} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'ts-available-apartments-form',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './available-apartments-form.component.html',
  styleUrl: './available-apartments-form.component.scss'
})
export class AvailableApartmentsFormComponent {

}
