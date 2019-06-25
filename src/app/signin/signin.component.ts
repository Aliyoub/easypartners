import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  public ngForm: NgForm;
  errorMessage: string;
  /* email: string;
  password: string; */
  //public users = [];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  onSubmit(f: NgForm) {
    this.ngForm = f;
    const email = this.ngForm.value.email;
    const password = this.ngForm.value.password;
    //this.authService.signin(email, password);

    this.authService.signin(email, password).then(
      () => {
        this.router.navigate(['/projects']);
        //this.router.navigate(['/myad2675min']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
