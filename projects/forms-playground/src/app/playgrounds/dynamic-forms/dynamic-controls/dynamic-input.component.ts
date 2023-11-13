import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTROL_DATA } from '../control-data.token';
import { ControlContainer, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { BaseDynamicControl, dynamicControlProvider } from './base-dynamic-control';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <label [for]="control.controlKey">{{ control.config.label }}</label>
    <input [formControlName]="control.controlKey" [value]="control.config.value" [id]="control.controlKey" [type]="control.config.type">
`,
  styles: [
  ],
  viewProviders: [dynamicControlProvider],
})
export class DynamicInputComponent extends BaseDynamicControl {
}