import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    fullAddress: new FormControl(''),
    city: new FormControl(''),
    postCode: new FormControl(0),
  });
  
  constructor() { }

  ngOnInit(): void {
  }

}
