import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  /* email: string;
  password: string; */
  //public users = [];
  constructor(private authService: AuthService) { }

  ngOnInit() { }

  onSubmit(f: NgForm) {
    this.ngForm = f;
    const email = this.ngForm.value.email;
    const password = this.ngForm.value.password;
    this.authService.signin(email, password);
  }
}
