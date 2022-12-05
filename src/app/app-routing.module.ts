import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { FibonacciComponent } from './fibonacci/fibonacci.component';
import { FullComponent } from './full/full.component';
import { HomeComponent } from './home/home.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'all', redirectTo: '/all/users', pathMatch: 'full' },
  { path: 'login', component: AuthenticateComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'all',
    component: FullComponent,
    children: [
      {
        path: 'users',
        canActivate: [AuthGuardService],
        component: UsersComponent,
      },
      {
        path: 'fibonacci',
        component: FibonacciComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'administration',
        component: CreateAccountComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'leaflet',
        component: LeafletMapComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
