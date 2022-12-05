import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SendNameService } from '../Services/send-name.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  listMenu = [
    {
      number: '1',
      name: 'Map',
      icon: 'map',
      link: 'users',
    },
    {
      number: '2',
      name: 'Fibonacci',
      icon: 'add_circle_outline',
      link: 'fibonacci',
    },
    {
      number: '3',
      name: 'Administration',
      icon: 'supervised_user_circle',
      link: 'administration',
    },
  ];
  constructor(private shareName: SendNameService, private route: Router) {}

  ngOnInit(): void {}
  sendPageName(pageName: string) {
    console.log(pageName);
    this.shareName.sendName(pageName);
  }
  logout() {
    localStorage.clear();
    this.route.navigate(['/home']);
  }
}
