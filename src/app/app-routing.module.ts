import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { CreateAccountComponent } from './create-account/create-account.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './full/full.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/create-account', pathMatch: 'full' },
  { path: 'authenticate', component: AuthenticateComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },

  {
    path: 'all',
    component: FullComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'home', component: HomeComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
