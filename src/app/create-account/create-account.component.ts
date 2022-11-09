import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AuthentificationService } from '../Services/authentification.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  user: User = new User();

  formCreateAccount: FormGroup = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    dateNaissance: new FormControl('', Validators.required),
    sexe: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required),
    codePostale: new FormControl('', Validators.required),
    numTel: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private authService: AuthentificationService,
    private route: Router
  ) {}

  ngOnInit(): void {}
  register() {
    if (this.formCreateAccount.invalid) {
      alert('Vérifier les champs obloigatoires');
    } else {
      this.authService.saveUser(this.formCreateAccount.value).subscribe(
        (res) => {
          console.log(res);
          alert('Votre compte a été crée avec succés !');
          this.route.navigate(['/authenticate']);
        },
        (err) => {
          alert('Email ou username existe déja ! ' + err.status);
        }
      );
    }
  }
}
