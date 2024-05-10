import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatFormField, MatHint, MatLabel, MatPrefix, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from '@angular/forms';
import {Apartment} from 'src/app/common/models/Apartment';

@Component({
  selector: 'ts-create-apartment-form',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatPrefix,
    MatSuffix,
    MatButton,
    ReactiveFormsModule,
    MatHint
  ],
  templateUrl: './create-apartment-form.component.html',
  styleUrl: './create-apartment-form.component.scss'
})
export class CreateApartmentFormComponent implements OnInit {
  @ViewChild(FormGroupDirective) createApartmentForm: FormGroupDirective;
  @Output() createApartment: EventEmitter<Apartment> = new EventEmitter();

  createForm: FormGroup;

  get descriptionLength() {
    const descriptionControl = this.createForm.controls['description'];
    return descriptionControl.value ? descriptionControl.value.length : 0;
  }

  get nameLength() {
    const nameControl = this.createForm.controls['name'];
    return nameControl.value ? nameControl.value.length : 0;
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }


  public onSubmit() {
    if (this.createForm.valid) {
      this.createApartment.emit(this.createForm.value);
      this.createApartmentForm.resetForm();
    }
  }

  private initForm() {
    this.createForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(98)]],
      rooms: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.maxLength(998)]],
    });
  }
}
