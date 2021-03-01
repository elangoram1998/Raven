import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { noop } from 'rxjs';
import { checkSamePassword } from 'src/app/shared/is-same-password.directive';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  showPassword: boolean = true;
  showConfirmPassword: boolean = true;
  @ViewChild(FormGroupDirective)
  formGroupDirective!: FormGroupDirective;

  constructor(private fb: FormBuilder,
    private profileService: ProfileService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  passwordForm = this.fb.group({
    password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')]],
    confirmPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')]]
  }, { validators: checkSamePassword });

  changePassword() {
    console.log(this.password?.value);
    this.profileService.changePassword(this.password?.value).subscribe(
      () => {
        this.snackBar.open('Password Changed', 'Reload to see', {
          duration: 3000
        })
      },
      error => {
        console.log(error);
      }
    );
    if (this.passwordForm.valid) {
      setTimeout(() => this.formGroupDirective.resetForm(), 0)
    }
  }

  get password() {
    return this.passwordForm.get('password');
  }
  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }

}
