import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatHint, MatLabel, MatPrefix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {Apartment} from 'src/app/common/models/Apartment';
import {ApartmentService} from 'src/app/common/services/apartment.service';
import {Subject, takeUntil} from 'rxjs';
import {SnackbarService} from 'src/app/common/services/snackbar.service';

@Component({
  selector: 'ts-edit-apartment-modal-form',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    FormsModule,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatPrefix,
    ReactiveFormsModule
  ],
  templateUrl: './edit-apartment-modal-form.component.html',
  styleUrl: './edit-apartment-modal-form.component.scss'
})
export class EditApartmentModalFormComponent implements OnInit, OnDestroy {

  editForm: FormGroup;

  get descriptionLength() {
    const descriptionControl = this.editForm.controls['description'];
    return descriptionControl.value ? descriptionControl.value.length : 0;
  }

  get nameLength() {
    const nameControl = this.editForm.controls['name'];
    return nameControl.value ? nameControl.value.length : 0;
  }

  private untilSubject$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<EditApartmentModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Apartment,
    private fb: FormBuilder,
    private apartmentService: ApartmentService,
    private snackbarService: SnackbarService
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  public onSubmit() {
    if (this.editForm.valid) {
      this.apartmentService.updateApartment(this.data._id, this.editForm.value)
        .pipe(
          takeUntil(this.untilSubject$)
        )
        .subscribe(() => {
          this.snackbarService.showSuccessSnackBar('The apartment has been successfully updated!');
          this.apartmentService.getApartments();
        });

      this.dialogRef.close();
    }
  }

  private initForm() {
    this.editForm = this.fb.group({
      name: [this.data.name, [Validators.required, Validators.maxLength(98)]],
      rooms: [this.data.rooms, [Validators.required, Validators.min(1)]],
      price: [this.data.price, [Validators.required, Validators.min(1)]],
      description: [this.data.description, [Validators.required, Validators.maxLength(998)]],
    });
  }

  ngOnDestroy(): void {
    this.untilSubject$.next();
    this.untilSubject$.complete();
  }
}
