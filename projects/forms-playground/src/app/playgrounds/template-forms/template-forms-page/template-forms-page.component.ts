import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInfo } from '../../../core/user-info';
import { BanWordsDirective } from '../validators/ban-words.directive';

@Component({
  selector: 'app-template-forms-page',
  standalone: true,
  imports: [CommonModule, FormsModule, BanWordsDirective],
  templateUrl: './template-forms-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    '../../common-form.scss',
    './template-forms-page.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateFormsPageComponent implements OnInit {

  userInfo: UserInfo = {
    firstName: 'Andriy',
    lastName: '',
    nickname: '',
    email: '',
    yearOfBirth: 0,
    passport: '',
    fullAdress: '',
    city: '',
    postCode: 0,
    // password: '',
    // confirmPassword: '',
  }

  constructor() { }

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
  }

  ngOnInit(): void {
  }

  onSubmitForm(form:NgForm , e: SubmitEvent){
    console.log('form-values', form.value);
  }
}
