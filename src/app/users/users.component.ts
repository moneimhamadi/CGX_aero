import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AuthentificationService } from '../Services/authentification.service';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  listOfUsers: User[];
  constructor(
    private userService: UsersService,
    private authenService: AuthentificationService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        console.log(data);
        this.listOfUsers = data;
      },
      (error) => {
        console.log('Error Occured', error);
      }
    );
  }
}
