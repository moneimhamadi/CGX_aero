import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../Services/authentification.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss'],
})
export class AuthenticateComponent implements OnInit {
  @ViewChild('myDialog', { static: true }) secondDialog: TemplateRef<any>;
  loginForm!: FormGroup;
  responseData!: any;
  username: string;
  constructor(
    private authenticationService: AuthentificationService,
    private formBuilder: FormBuilder,
    private route: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  panelOpenState = false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  authenticate() {
    if (this.loginForm.invalid) {
      alert('Remplir adresse et Mot de passe');
    } else {
      this.authenticationService
        .checkEnabledAccount(this.loginForm.value.username)
        .subscribe((res) => {
          console.log(res);
          if (res == 2) {
            this.authenticationService
              .authenticate(
                this.loginForm.value.username,
                this.loginForm.value.password
              )
              .subscribe(
                (result) => {
                  console.log(result);
                  this.responseData = result;

                  localStorage.setItem(
                    'access_token',
                    this.responseData['access_Token']
                  );
                  localStorage.setItem(
                    'refresh_token',
                    this.responseData['refresh_Token']
                  );
                  localStorage.setItem('roles', this.responseData['roles']);
                  localStorage.setItem(
                    'username',
                    this.responseData['username']
                  );
                  this.route.navigate(['/all/users']);
                },
                (error) => {
                  alert('Vérifier votre mot de passe !');
                }
              );
          }
          if (res == 0) {
            alert("Compte n'est pas trouvé !!Vérifier votre username !");
          }
          if (res == 1) {
            alert("Votre compte n'est pas encore activé ! ");
          }
        });
    }
  }

  openDialogForgetPassword(templateRef: TemplateRef<any>) {
    // if (this.formCreateAccount.invalid) {
    //   this._snackBar.open("Champs manquants!!", "ERROR", {
    //     horizontalPosition: "right",
    //     verticalPosition: "top",
    //   });
    // } else {
    let dialogRef = this.dialog.open(templateRef, {
      height: '600px',
      width: '600px',
    });
    // }
  }
  sendResetPasswordEmail() {
    if (this.username == undefined) {
      alert('Veuillez entrer votre username !');
    } else {
      this.authenticationService
        .sendResetPasswordEmail(this.username)
        .subscribe(
          (resultat) => {
            console.log(resultat);
            if (resultat == 0) {
              alert("Pas d'utilisateur avec cette username !");
            }
            if (resultat == 1) {
              alert(
                'Un lien de reset de mot de passe a été envoyé a votre boite email'
              );
              this.dialog.closeAll();
            }
          },
          (error) => {
            alert('ERROR when sending reset password email');
          }
        );
    }
  }
}
