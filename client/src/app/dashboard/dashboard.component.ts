import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public articles: any = {};
  public domains: any = []

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.findArticles()
      .subscribe((data: any) => {
        this.articles = {
          pending: data.filter((item: any) => item.status === 'NEW'),
          approved: data.filter((item: any) => item.status === 'APPROVED'),
          rejected: data.filter((item: any) => item.status === 'REJECTED')
        };
        this.domains = data.map((d: any) => d.subject);
      },
        err => {
          console.log(err);
        }
      );
  }
}
