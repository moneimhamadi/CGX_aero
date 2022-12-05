import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SendNameService } from '../Services/send-name.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  titleOfPage: string;
  constructor(private router: Router, private sendName: SendNameService) {}

  ngOnInit(): void {
    this.titleOfPage = 'Map';
    this.sendName.getName().subscribe((data) => {
      this.titleOfPage = data;
    });
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
