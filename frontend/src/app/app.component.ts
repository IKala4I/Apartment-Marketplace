import {Component} from '@angular/core';
import {LayoutComponent} from 'src/app/layout/layout.component';

@Component({
  selector: 'ts-root',
  standalone: true,
  imports: [LayoutComponent],
  template: `
    <ts-layout></ts-layout>`,
})
export class AppComponent {
}
