import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTROL_DATA } from '../control-data.token';
import { ControlContainer, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { BaseDynamicControl } from './base-dynamic-control';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <ng-container [formGroup]="formGroup">
    <input [formControlName]="control.controlKey" [value]="control.config.value" [id]="control.controlKey" [type]="control.config.type">
  </ng-container>
`,
  styles: [
  ],
  providers: [FormGroupDirective]
})
export class DynamicInputComponent extends BaseDynamicControl {
}