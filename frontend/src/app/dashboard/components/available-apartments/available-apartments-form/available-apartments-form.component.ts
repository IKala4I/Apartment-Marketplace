import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect, MatSelectChange} from '@angular/material/select';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApartmentService} from 'src/app/common/services/apartment.service';
import {LocalStorageService} from 'src/app/common/services/local-storage.service';
import {Subject, takeUntil} from 'rxjs';
import {getParamsFromLocalStorage} from 'src/app/utils/getParamsFromLocalStorage';

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
export class AvailableApartmentsFormComponent implements OnInit, OnDestroy {

  manageForm: FormGroup;

  private untilSubject$ = new Subject<void>();

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

  ngOnDestroy(): void {
    this.untilSubject$.next();
    this.untilSubject$.complete();
  }
}
