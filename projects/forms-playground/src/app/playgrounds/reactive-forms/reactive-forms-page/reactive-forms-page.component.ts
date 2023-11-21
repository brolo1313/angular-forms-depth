import { ERROR_MESSAGES, VALIDATION_ERROR_MESSAGES } from './../../../core/input-error/validation-error-message.token';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subscription, bufferCount, filter, tap } from 'rxjs';
import { UserSkillsService } from '../../../core/user-skills.service';
import { banWords } from '../validators/ban-word.validator';
import { passwordShouldMatch } from '../validators/password-match.validator';
import { UniqueNicknameValidator } from '../validators/uniq-name.validator';
import { InputErrorComponent } from '../../../core/input-error/input-error-message.component';

@Component({
  selector: 'app-reactive-forms-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputErrorComponent],
  templateUrl: './reactive-forms-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    '../../common-form.scss',
    './reactive-forms-page.component.scss'
  ],
  providers: [
    {
      provide: VALIDATION_ERROR_MESSAGES,
      useValue:{...ERROR_MESSAGES, minlength: 'another min length hint' }
    }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormsPageComponent implements OnInit {

  phoneLabels = ['Main', 'Mobile', 'Work', 'Home'];
  years =  this.getYears();
  skills$!: Observable<string[]>;

  form = this.fb.group({
    firstName: ['Andriy', [Validators.required, Validators.minLength(2), banWords(['test', 'dummy'])]],
    lastName: ['Yupin', [Validators.required, Validators.minLength(2)]],
    nickname: ['',
    {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[\w.]+$/),
        banWords(['dummy', 'anonymous'])
      ],
      asyncValidators: [
        this.uniqueNickname.validate.bind(this.uniqueNickname)
      ],
      updateOn: 'blur'
    },
  ],
    email: ['brolo1341@gmail.com', [Validators.email, Validators.required]],
    yearOfBirth: this.fb.nonNullable.control(
      this.years[this.years.length - 1],
      Validators.required
    ),
    passport: ['', [Validators.pattern(/^[A-Z]{2}[0-9]{6}$/)]],
    address: this.fb.nonNullable.group({
      fullAddress: ['', Validators.required],
      city: ['', Validators.required],
      postCode: [0, Validators.required]
    }),
    phones: this.fb.array([
      this.fb.group({
        label: this.fb.nonNullable.control(this.phoneLabels[0]),
        phone: ''
      })
    ]),
    skills: this.fb.group({}),
    password: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: '',
    }, { validators: passwordShouldMatch})
  });

  private formPendingState!: Subscription;
  
  constructor(
    private userSkills: UserSkillsService,
    private fb: FormBuilder,
    private uniqueNickname: UniqueNicknameValidator,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.skills$ = this.userSkills.getSkills().pipe(
      tap(skills => this.buildSkillControls(skills))
    );

    this.formPendingState = this.form.statusChanges.pipe(
      bufferCount(2, 1),
      filter(([prevState]) => prevState === 'PENDING')
    ).subscribe(() => this.cd.markForCheck())
  }

  addPhone() {
    this.form.controls.phones.insert(0,
      new FormGroup({
        label: new FormControl(this.phoneLabels[0], { nonNullable: true }),
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

  private getYears() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
  }

  private buildSkillControls(skills: string[]) {
    skills.forEach(skill =>
      this.form.controls.skills.addControl(
        skill,
        new FormControl(false, { nonNullable: true })
      )
    );
  }

}