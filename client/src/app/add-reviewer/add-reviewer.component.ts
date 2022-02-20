import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from './../app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-reviewer',
  templateUrl: './add-reviewer.component.html',
  styleUrls: ['./add-reviewer.component.scss']
})
export class AddReviewerComponent implements OnInit {

  public reviewerForm!: FormGroup

  constructor(private fb: FormBuilder, private appService: AppService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.reviewerForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])]
    })

  }

  public addReviewer() {
    if (this.reviewerForm.valid) {
      const id = this.route.snapshot.params['id'];
      this.appService.addReviewer({ paper: id, reviewer: this.reviewerForm.value.email })
        .subscribe(data => {
          this.router.navigateByUrl('/dashboard');
        })
    }

  }
}
