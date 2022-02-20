import { Router } from '@angular/router';
import { AppService } from './../app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {
  public submissionForm!: FormGroup;
  constructor(private fb: FormBuilder, private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.submissionForm = this.fb.group(
      {
        title: [null, Validators.required],
        subject: [null, Validators.required],
        keywords: [null, Validators.required],
        summary: [null, Validators.required],
      }
    )
  }

  public submitPaper() {
    if (this.submissionForm.valid) {
      this.appService.savePaper(this.submissionForm.value).subscribe(
        (data: any) => {
          this.router.navigateByUrl('/')
        }
      )
    }
  }

}
