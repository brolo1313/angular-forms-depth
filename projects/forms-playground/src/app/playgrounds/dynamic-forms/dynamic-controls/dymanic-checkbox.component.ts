import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseDynamicControl, dynamicControlProvider } from './base-dynamic-control';

@Component({
  selector: 'app-dynamic-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
      <input type="checkbox" [formControlName]="control.controlKey" [checked]="control.config.value" [id]="control.controlKey">
      <label [for]="control.controlKey">{{control.config.label}}</label>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      margin-top: 10px;
    }
  `],
    viewProviders: [dynamicControlProvider],
})
export class DynamicCheckboxComponent extends BaseDynamicControl {
}