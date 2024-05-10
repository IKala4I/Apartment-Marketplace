import {Component, Input} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'ts-box-wrapper',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './box-wrapper.component.html',
  styleUrl: './box-wrapper.component.scss'
})
export class BoxWrapperComponent {
  @Input() public backgroundColor: string = 'white';
}
