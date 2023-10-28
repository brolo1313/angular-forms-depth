import { inject, Injector, Pipe, PipeTransform } from '@angular/core';
import { CONTROL_DATA } from './control-data.token';
import { DynamicControl } from './models/dynamic-forms.models';

@Pipe({
  name: 'controlInjector',
  standalone: true
})
export class ControlInjectorPipe implements PipeTransform {

  transform(controlKey: string, config: DynamicControl): Injector {
    return Injector.create({
      providers: [
        {
          provide: CONTROL_DATA,
          useValue: { controlKey, config }
        }
      ]
    });
  }

}
