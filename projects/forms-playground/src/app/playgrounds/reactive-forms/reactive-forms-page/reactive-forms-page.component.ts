import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-forms-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    '../../common-form.scss',
    './reactive-forms-page.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormsPageComponent implements OnInit {

  phoneLabels = ['Main', 'Mobile', 'Work', 'Home'];
  
  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
  }

  form = new FormGroup({
    firstName: new FormControl('Andrew'),
    lastName: new FormControl('Yupin'),
    nickname: new FormControl(''),
    email: new FormControl('test@gmail.com'),
    yearOfBirth: new FormControl(1991),
    passport: new FormControl(''),
    address: new FormGroup({
      fullAddress: new FormControl(''),
      city: new FormControl(''),
      postCode: new FormControl(0),
    }),
    phones: new FormArray([
      new FormGroup({
        label: new FormControl(this.phoneLabels[0]),
        phone: new FormControl('')
      })
    ])
  });
  
  constructor() { }

  addPhone() {
    this.form.controls.phones.insert(0,
      new FormGroup({
        label: new FormControl(this.phoneLabels[0]),
        phone: new FormControl('')
      })
    )
  }

  removePhone(index: number) {
    this.form.controls.phones.removeAt(index);
  }

  onSubmit(e: Event) {
    console.log(this.form.value);
  }
  
  ngOnInit(): void {
  }

  

}
