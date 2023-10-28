import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      dynamic-input works!
    </p>
  `,
  styles: [
  ]
})
export class DynamicInputComponent   {
}
