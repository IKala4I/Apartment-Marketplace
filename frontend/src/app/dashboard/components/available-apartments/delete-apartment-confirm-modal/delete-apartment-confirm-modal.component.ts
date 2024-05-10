import {Component, Inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent} from '@angular/material/dialog';

@Component({
  selector: 'ts-delete-apartment-confirm-modal',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent
  ],
  templateUrl: './delete-apartment-confirm-modal.component.html',
  styleUrl: './delete-apartment-confirm-modal.component.scss'
})
export class DeleteApartmentConfirmModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
  ) {
  }
}
