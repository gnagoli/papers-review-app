import { CookieService } from 'ngx-cookie-service';
import { environment } from './../../environments/environment';
import { AppService } from './../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artilce-page',
  templateUrl: './artilce-page.component.html',
  styleUrls: ['./artilce-page.component.scss']
})
export class ArtilcePageComponent implements OnInit {
  public article: any = {}
  public access_token = ''
  public apiUrl = environment.apiUrl;

  constructor(private router: Router, private route: ActivatedRoute, private appService: AppService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.access_token = this.cookieService.get('access_token');
    if (!this.access_token) {
      this.router.navigateByUrl('/login?returnUrl=' + this.route.snapshot.url)
    }
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.appService.getArticle(id).subscribe(data => {
        this.article = data;
      })
    }
  }

}
