import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthentificationService } from '../Services/authentification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  confirmPasswordForm!: FormGroup;
  error_messages = {
    password: [
      { type: 'required', message: 'mot de passe est  obligatoire !' },
      { type: 'minlength', message: ' Faible!' },
      {
        type: 'maxlength',
        message: ' Fort ( 8 charactères au max) ',
      },
    ],
    confirmPassword: [
      { type: 'required', message: 'mot de passe est  obligatoire !' },
      { type: 'minlength', message: 'Faible!' },
      {
        type: 'maxlength',
        message: 'Fort(8 charactères au max)',
      },
    ],
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authentificationService: AuthentificationService,
    private router: Router
  ) {
    this.confirmPasswordForm = this.formBuilder.group(
      {
        password: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ])
        ),

        confirmPassword: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ])
        ),
      },
      {
        validators: this.password.bind(this),
      }
    );
  }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params.token;
    console.log(this.token);
  }
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
  changePassword() {
    console.log(this.token);
    console.log(this.confirmPasswordForm.value.password);

    this.authentificationService
      .changePassword(this.token, this.confirmPasswordForm.value.password)
      .subscribe((res) => {
        console.log(res);
        if (res == 2) {
          alert(
            'Mot de passe modifié.Retenir votre mot de passe ' +
              this.confirmPasswordForm.value.password
          );
          this.router.navigate(['/authenticate']);
        }
        if (res == 0 || res == 1) {
          alert('Token est expirée.Veuiilez renvoyer un email !');
          this.router.navigate(['/authenticate']);
        }
      });
  }
}
