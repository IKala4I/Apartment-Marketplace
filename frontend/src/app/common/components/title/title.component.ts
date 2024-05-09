import {Component, Input} from '@angular/core';

@Component({
  selector: 'ts-title',
  standalone: true,
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {
  @Input() emoji: string;
  @Input() title: string;
  @Input() public availableApartmentsCount: number;
}
