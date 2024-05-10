import {Component, Input, OnDestroy} from '@angular/core';
import {BoxWrapperComponent} from 'src/app/common/components/box-wrapper/box-wrapper.component';
import {MatButton} from '@angular/material/button';
import {Apartment} from 'src/app/common/models/Apartment';
import {TruncatePipe} from 'src/app/common/pipes/truncate.pipe';
import {MatDialog} from '@angular/material/dialog';
import {
  AvailableApartmentFullInfoComponent
} from 'src/app/dashboard/components/available-apartments/available-apartment-list/available-apartment-full-info/available-apartment-full-info.component';
import {
  DeleteApartmentConfirmModalComponent
} from 'src/app/dashboard/components/available-apartments/delete-apartment-confirm-modal/delete-apartment-confirm-modal.component';
import {finalize, iif, of, Subject, switchMap, takeUntil} from 'rxjs';
import {ApartmentService} from 'src/app/common/services/apartment.service';
import {SnackbarService} from 'src/app/common/services/snackbar.service';
import {
  EditApartmentModalFormComponent
} from 'src/app/dashboard/components/available-apartments/edit-apartment-modal-form/edit-apartment-modal-form.component';

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
export class AvailableApartmentItemComponent implements OnDestroy {
  @Input() apartment: Apartment;

  private untilSubject$ = new Subject<void>();

  constructor(private dialog: MatDialog, private apartmentService: ApartmentService, private snackbarService: SnackbarService) {
  }

  openDialog() {
    this.dialog.open(AvailableApartmentFullInfoComponent, {data: this.apartment});
  }

  confirmDeleteModal(event: Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DeleteApartmentConfirmModalComponent, {
      data: {
        name: this.apartment.name
      }
    });

    dialogRef.afterClosed()
      .pipe(
        switchMap(confirmed => iif(() => confirmed, this.deleteApartment(), of(confirmed))),
        takeUntil(this.untilSubject$)
      )
      .subscribe(() => {
        this.apartmentService.getApartments();
      });
  }

  deleteApartment() {
    return this.apartmentService.deleteApartment(this.apartment._id)
      .pipe(
        finalize(() => {
          this.snackbarService.showSuccessSnackBar('The apartment has been successfully deleted!');
        }),
        takeUntil(this.untilSubject$)
      );
  }

  openEditModalForm(event: Event) {
    event.stopPropagation();

    this.dialog.open(EditApartmentModalFormComponent, {
      data: this.apartment
    });
  }

  ngOnDestroy(): void {
    this.untilSubject$.next();
    this.untilSubject$.complete();
  }
}
