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

  authenticate() {
    this.authenticationService.authenticate(this.loginForm.value).subscribe(
      (result) => {
        console.log(result);
        this.responseData = result;

        localStorage.setItem('accessToken', this.responseData['accessToken']);
        localStorage.setItem('refreshToken', this.responseData['refreshToken']);
        localStorage.setItem('roles', this.responseData['roles']);
        localStorage.setItem('username', this.responseData['username']);
        localStorage.setItem('tokenType', this.responseData['tokenType']);
        localStorage.setItem('idUser', JSON.stringify(this.responseData['id']));
        this.route.navigate(['/all/users']);
      },
      (error) => {
        console.log(error);
        alert('Vérifier votre mot de passe !');
      }
    );
  }
}
