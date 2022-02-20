import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public articles: any = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    // this.appService.findArticles()
    //   .subscribe(data => {
    //     this.articles = data;
    //   },
    //     err => {
    //       console.log(err);
    //     }

    //   );

  }

}
