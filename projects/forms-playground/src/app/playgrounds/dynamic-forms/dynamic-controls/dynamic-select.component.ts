import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTROL_DATA } from '../control-data.token';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { BaseDynamicControl, dynamicControlProvider } from './base-dynamic-control';

@Component({
  selector: 'app-dynamic-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <label [for]="control.controlKey">{{ control.config.label }}</label>
    <select [formControlName]="control.controlKey" [id]="control.controlKey" [value]="control.config.value">
      <option *ngFor="let option of control.config.options" [value]="option.value">{{option.label}}</option>
    </select>
`,
  styles: [
  ],
  viewProviders: [dynamicControlProvider],
})
export class DynamicSelectComponent extends BaseDynamicControl {
}
