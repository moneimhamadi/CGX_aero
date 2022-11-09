import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { map, filter, scan } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'admin-panel-layout';
  sideBarOpen = true;
  hideHeader = false;
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  blankUrl = '';
  currentUrl: string;
  checkoutUrls = ['/create-account'];
  constructor(private router: Router) {}
  ngOnInit(): void {
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe((e: NavigationEnd) => {
    //     this.currentUrl = e.url;
    //     if (
    //       this.currentUrl == '/create-account' ||
    //       this.currentUrl == '/authenticate'
    //     ) {
    //       this.sideBarToggler();
    //       this.hideHeader = true;
    //     }
    //     // console.log(this.currentUrl);
    //     // setTimeout((callback) => {
    //     //   window.scrollTo(0, 0);
    //     // }, 100);
    //   });
  }
  isCheckoutRoute() {
    if (!this.currentUrl) {
      return false;
    }
    const index = this.checkoutUrls.indexOf(this.currentUrl);
    if (index >= 0) {
      return true;
    } else {
      return false;
    }
  }
}
