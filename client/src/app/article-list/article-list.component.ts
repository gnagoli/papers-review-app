import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  public articles: any = [];
  public domains: any = []
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.findArticles()
      .subscribe((data:any) => {
        this.articles =[...data];
        this.domains = new Set(data.map((d:any)=>d.subject));
      },
        err => {
          console.log(err);
        }
      );
  }

}
