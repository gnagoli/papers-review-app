import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public connected = false
  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    this.connected = this.cookieService.check('access_token');
  }

}
