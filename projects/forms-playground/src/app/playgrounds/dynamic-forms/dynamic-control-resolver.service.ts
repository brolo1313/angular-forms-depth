import { Injectable, Type } from '@angular/core';
import { DynamicInputComponent } from './dynamic-controls/dynamic-input.component';
import { DynamicSelectComponent } from './dynamic-controls/dynamic-select.component';
import { DynamicControl } from './models/dynamic-forms.models';
import { DynamicCheckboxComponent } from './dynamic-controls/dymanic-checbox.cpmponent';
import { DynamicGroupComponent } from './dynamic-controls/dynamic-group.component';

type DynamicControlsMap = {
  [T in DynamicControl['controlType']]: Type<any>;
};

@Injectable({
  providedIn: 'root'
})
export class DynamicControlResolver {
  private controlComponents: DynamicControlsMap = {
    input: DynamicInputComponent,
    select: DynamicSelectComponent,
    checkbox: DynamicCheckboxComponent,
    group: DynamicGroupComponent,
  }
  resolve(controlType: keyof DynamicControlsMap) {
    return this.controlComponents[controlType];
  }
}