import { ReviewingComponent } from './reviewing/reviewing.component';
import { AddReviewerComponent } from './add-reviewer/add-reviewer.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubmissionComponent } from './submission/submission.component';
import { ArtilcePageComponent } from './artilce-page/artilce-page.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'article/:id',
    component: ArtilcePageComponent
  },
  {
    path: 'add-reviewer/:id',
    component: AddReviewerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'review/:id',
    component: ReviewingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'submission',
    component: SubmissionComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
