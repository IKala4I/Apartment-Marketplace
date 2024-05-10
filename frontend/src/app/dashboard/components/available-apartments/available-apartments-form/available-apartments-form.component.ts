import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect, MatSelectChange} from '@angular/material/select';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApartmentService} from 'src/app/common/services/apartment.service';
import {LocalStorageService} from 'src/app/common/services/local-storage.service';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import {getParamsFromLocalStorage} from 'src/app/utils/getParamsFromLocalStorage';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

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
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
    MatSuffix
  ],
  templateUrl: './available-apartments-form.component.html',
  styleUrl: './available-apartments-form.component.scss'
})
export class AvailableApartmentsFormComponent implements OnInit, OnDestroy {

  manageForm: FormGroup;

  private untilSubject$ = new Subject<void>();

  get roomsValue() {
    const roomsControl = this.manageForm.get('rooms');
    console.log(roomsControl?.value);
    return roomsControl?.value ? roomsControl?.value : null;
  }

  constructor(private fb: FormBuilder, private apartmentService: ApartmentService, private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.initForm();
  }

  public initForm() {
    const params = getParamsFromLocalStorage(this.localStorageService);

    this.manageForm = this.fb.group({
      price: [params['price'] ? params['price'] : null],
      rooms: [params['rooms'] ? params['rooms'] : null]
    });

    this.manageForm.get('rooms')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.untilSubject$),
      )
      .subscribe(value => {
        if (value)
          this.localStorageService.saveData('rooms', value);
        this.apartmentService.getApartments();
      });
  }

  public sortApartments(event: MatSelectChange) {
    if (event.value)
      this.localStorageService.saveData('price', event.value);
    else
      this.localStorageService.deleteData('price');

    this.apartmentService.getApartments()
      .pipe(
        takeUntil(this.untilSubject$)
      )
      .subscribe(() => {
      });
  }

  public clearRooms() {
    this.localStorageService.deleteData('rooms');
    this.manageForm.get('rooms')?.setValue(null);
    this.apartmentService.getApartments()
      .pipe(
        takeUntil(this.untilSubject$)
      )
      .subscribe(() => {
      });
  }

  ngOnDestroy(): void {
    this.untilSubject$.next();
    this.untilSubject$.complete();
  }
}
