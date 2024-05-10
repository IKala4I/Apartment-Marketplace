import {Component, OnDestroy} from '@angular/core';
import {TitleComponent} from 'src/app/common/components/title/title.component';
import {BoxWrapperComponent} from 'src/app/common/components/box-wrapper/box-wrapper.component';
import {
  CreateApartmentFormComponent
} from 'src/app/dashboard/components/create-apartment/create-apartment-form/create-apartment-form.component';
import {Apartment} from 'src/app/common/models/Apartment';
import {ApartmentService} from 'src/app/common/services/apartment.service';
import {SnackbarService} from 'src/app/common/services/snackbar.service';
import {Subject, takeUntil} from 'rxjs';

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
export class CreateApartmentComponent implements OnDestroy {

  private untilSubject$ = new Subject<void>();

  constructor(private apartmentService: ApartmentService, private snackbarService: SnackbarService) {
  }

  public createApartment(apartment: Apartment) {
    this.apartmentService.createApartment(apartment)
      .pipe(
        takeUntil(this.untilSubject$)
      )
      .subscribe(() => {
        this.snackbarService.showSuccessSnackBar('The apartment has been successfully created!');
        this.apartmentService.getApartments();
      });
  }

  ngOnDestroy(): void {
    this.untilSubject$.next();
    this.untilSubject$.complete();
  }
}
