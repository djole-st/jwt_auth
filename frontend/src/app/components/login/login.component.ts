import { element } from 'protractor';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private myservice: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
   }

  ngOnInit(): void {
  }

  isValid(controlName): any {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  login(): void {
    console.log(this.loginForm.value);
    if (this.loginForm.valid)
    {
      this.myservice.login(this.loginForm.value)
    .subscribe(
      data => {
        console.log(data);
        localStorage.setItem('token', data.toString());
        this.router.navigate(['/home']);
      },
      error => {}
    );
    }
  }

  movetoregister(): void {
    console.log(this.router.url);
    this.router.navigate(['../register'], { relativeTo: this.activatedRoute });
  }

}
