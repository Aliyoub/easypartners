import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public ngForm: NgForm;
  /* email: string;
  password: string; */
  //public users = [];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  onSubmit(f: NgForm) {
    this.ngForm = f;
    const email = this.ngForm.value.email;
    const password = this.ngForm.value.password;
    this.authService.signup(email, password);
    this.router.navigate(['/projects']);
  }
}
