import {Component, OnInit, ViewChild} from '@angular/core';
import {MatFormField, MatHint, MatLabel, MatPrefix, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from '@angular/forms';
import {SnackbarService} from 'src/app/common/services/snackbar.service';

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
  createForm: FormGroup;

  get descriptionLength() {
    const descriptionControl = this.createForm.controls['description'];
    return descriptionControl.value ? descriptionControl.value.length : 0;
  }

  get nameLength() {
    const nameControl = this.createForm.controls['name'];
    return nameControl.value ? nameControl.value.length : 0;
  }

  constructor(private fb: FormBuilder, private snackbarService: SnackbarService) {
  }

  ngOnInit() {
    this.initForm();
  }


  public onSubmit() {
    if (this.createForm.valid) {
      this.createApartmentForm.resetForm();
      console.log(this.createForm.value);
      this.snackbarService.showSuccessSnackBar('Apartment have been created');
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
