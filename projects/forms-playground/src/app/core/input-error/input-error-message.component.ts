import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { ValidationErrors } from '@angular/forms';
import { VALIDATION_ERROR_MESSAGES } from './validation-error-message.token';

@Component({
  selector: 'app-input-error',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngFor="let error of errors | keyvalue; trackBy:trackByFn" class="input-error">
      {{ errorsMap[error.key] (error.value) }}
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ]
})
export class InputErrorComponent {

  @Input()
  errors: ValidationErrors | undefined | null = null;

  protected errorsMap = inject(VALIDATION_ERROR_MESSAGES);

  trackByFn(index: number, item: KeyValue<string, any>) {
    return item.key;
  }
}