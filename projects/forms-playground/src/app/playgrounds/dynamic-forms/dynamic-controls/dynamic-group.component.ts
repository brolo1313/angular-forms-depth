import { Component, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseDynamicControl, dynamicControlProvider } from './base-dynamic-control';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlInjectorPipe } from '../control-injector.pipe';
import { DynamicControlResolver } from '../dynamic-control-resolver.service';

@Component({
  selector: 'app-dynamic-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ControlInjectorPipe],
  template: `
      <fieldset [formGroupName]="control.controlKey">
        <legend>{{control.config.label}}</legend>
        <ng-container *ngFor="let control of control.config.controls | keyvalue" class="form-field">
          <ng-container
            [ngComponentOutlet]="controlResolver.resolve(control.value.controlType) | async"
            [ngComponentOutletInjector]="control.key | controlInjector:control.value">
          </ng-container>
        </ng-container>
      </fieldset>
  `,
  styles: [
  ],
  viewProviders: [dynamicControlProvider],
})
export class DynamicGroupComponent extends BaseDynamicControl {
  @HostBinding('class') override hostClass = 'form-field-group';

  controlResolver = inject(DynamicControlResolver);
}