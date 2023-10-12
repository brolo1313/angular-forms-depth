import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInfo } from '../../../core/user-info';
import { BanWordsDirective } from '../validators/ban-words.directive';
import { PasswordShouldMatchedDirective } from '../validators/password-should-matched.directive';
import { UniqueNicknameDirective } from '../validators/unique-nickname.directive';

@Component({
  selector: 'app-template-forms-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BanWordsDirective,
    PasswordShouldMatchedDirective,
    UniqueNicknameDirective],
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
    lastName: 'Yupin',
    nickname: 'andrew.yupin',
    email: 'brolo1341@gmail.com',
    yearOfBirth: 1991,
    passport: 'AB123456',
    fullAdress: 'Somestreet 4',
    city: 'Kiev',
    postCode: 123456,
    password: '',
    confirmPassword: ''
  }

  @ViewChild(NgForm)
  formDir!: NgForm;

  private initialFormValues: unknown;
  
  constructor() { }

  get isAdult() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.userInfo.yearOfBirth >= 18;
  }

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      this.initialFormValues = this.formDir.value;
    })
  }

  onSubmitForm(e: SubmitEvent) {
    console.log('The form has been submitted', this.formDir.value);
  
    this.formDir.resetForm(this.formDir.value);
    this.initialFormValues = this.formDir.value;

  }

  onReset(e: Event) {
    e.preventDefault();
    this.formDir.resetForm(this.initialFormValues);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }
}
