import { Directive, HostBinding, SkipSelf, StaticProvider, inject } from "@angular/core";
import { ControlContainer, FormGroup } from "@angular/forms";
import { CONTROL_DATA } from "../control-data.token";
import { KeyValue } from "@angular/common";
import { DynamicControl } from "../models/dynamic-forms.models";


export const comparatorFn = (
  a: KeyValue<string, DynamicControl>,
  b: KeyValue<string, DynamicControl>
): number => (a.value.order ?? 0) -( b.value.order ?? 0);

export const dynamicControlProvider: StaticProvider = {
  provide: ControlContainer,
  useFactory: (container: ControlContainer) => container,
  deps: [[new SkipSelf(), ControlContainer]]
}

@Directive()
export class BaseDynamicControl {
  @HostBinding('class') hostClass = 'form-field';
  
  control = inject(CONTROL_DATA);
  // get formGroup() {
  //   return this.parentFormGroup.control as FormGroup;
  // }
  // private parentFormGroup = inject(ControlContainer);
}