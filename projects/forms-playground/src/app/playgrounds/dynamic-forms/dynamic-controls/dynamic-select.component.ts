import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTROL_DATA } from '../control-data.token';

@Component({
  selector: 'app-dynamic-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <select [id]="control.controlKey" [value]="control.config.value">
      <option *ngFor="let option of control.config.options" [value]="option.value">{{option.label}}</option>
    </select>
  `,
  styles: [
  ]
})
export class DynamicSelectComponent implements OnInit {

  control = inject(CONTROL_DATA);

  ngOnInit(): void {
    console.log(this.control);
  }
}
