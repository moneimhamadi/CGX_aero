import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AuthentificationService } from '../Services/authentification.service';
import { UsersService } from '../Services/users.service';
// import * as moment from 'moment/moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  //Dialog add user
  @ViewChild('myDialog', { static: true }) secondDialog: TemplateRef<any>;
  openDialogAddUser(templateRef: TemplateRef<any>) {
    let dialogRef = this.dialog.open(templateRef, {
      height: '600px',
      width: '800px',
    });
    // }
  }
  user: User = new User();
  list_users: User[];
  my_Roles = [
    { name: 'GUEST' },
    { name: 'OPERATOR' },
    { name: 'ADMINISTRATOR' },
  ];
  //pagination mat
  dataSource: any;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;
  dataSourceWithPageSize: any;
  pageSizes = [5, 7, 10];
  displayedColumns = [
    'username',
    'nom',
    'prenom',
    'email',
    'dateNaissance',
    // 'button',
  ];

  formCreateUser: FormGroup;
  res_check_date: boolean = true;
  constructor(
    private authService: AuthentificationService,
    private route: Router,
    private userService: UsersService,
    private formBuiler: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res) => {
      this.list_users = res['objectResponse'];
      console.log(this.list_users);
      this.dataSource = new MatTableDataSource(this.list_users);
      this.dataSourceWithPageSize = new MatTableDataSource(this.list_users);
      this.dataSource.paginator = this.paginator;
      this.dataSourceWithPageSize.paginator = this.paginatorPageSize;
    });
    this.formCreateUser = this.formBuiler.group({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      dateNaissance: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      roles: new FormControl(['GUEST'], [Validators.required]),
    });
  }
  register() {
    if (this.formCreateUser.invalid) {
      alert('Vérifier les champs obloigatoires');
    } else {
      this.authService.saveUser(this.formCreateUser.value).subscribe(
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
  checkDate() {
    // let date = (<HTMLInputElement>document.querySelector('#month')).value;
    // let month = (<HTMLInputElement>document.querySelector('#date')).value;
    // let year = (<HTMLInputElement>document.querySelector('#year')).value;
    // this.res_check_date = moment(
    //   `${month}/${date}/${year}`,
    //   'DD/MM/YYYY',
    //   true
    // ).isValid();
    // console.log(this.res_check_date);
    // let my_Birth_Date = moment(
    //   `${month}/${date}/${year}`,
    //   'DD/MM/YYYY'
    // ).format();
    // console.log(my_Birth_Date);
    // if (this.res_check_date == true && this.formCreateUser.valid) {
    //   this.userService.adduser(this.formCreateUser.value).subscribe((res) => {
    //     console.log(res);
    //   });
    // }
  }
  onSelectRole(value) {
    console.log(value);
    this.formCreateUser.value.roles = [value];
  }
  addUser() {
    console.log(this.formCreateUser.value);
    if (this.formCreateUser.invalid) {
      alert('Fill all required fields ');
    } else
      this.userService.adduser(this.formCreateUser.value).subscribe(() => {
        this._snackBar.open('User added successfully', 'OK', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.dialog.closeAll();
        this.ngOnInit();
      });
  }
}
