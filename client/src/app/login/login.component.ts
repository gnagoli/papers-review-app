import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private appService: AppService, private cookieService: CookieService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required]
    })
  }

  public login() {
    console.log(this.loginForm)
    if (this.loginForm.valid) {
      this.appService.login(this.loginForm.value).subscribe(
        data => {
          console.log(data)
          this.cookieService.set('access_token', data.token)
          const returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
          if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
          } else {
            this.router.navigateByUrl('/dashboard');
          }
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }
}
