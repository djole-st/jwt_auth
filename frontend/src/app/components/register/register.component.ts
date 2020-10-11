import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  successMessage = '';
  constructor(private myservice: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute) {

    this.myForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      cnfpass: new FormControl(null, this.passValidator)
    });

    this.myForm.controls.password.valueChanges.subscribe(x => this.myForm.controls.cnfpass.updateValueAndValidity());

  }

  passValidator(control: AbstractControl): any{
    if (control && (control.value !== null || control.value !== undefined))
    {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if (passControl){
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '')
        {
          return {isError: true};
        }
      }
    }
    return null;
  }

  isValid(controlName): any {
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }

  register(): void {
    console.log(this.myForm.value);

    if (this.myForm.valid) {
      this.myservice.submitRegister(this.myForm.value)
        .subscribe(
          data => this.successMessage = 'Registration Success',
          error => this.successMessage = 'SOme error'
        );
    }
  }

  movetologin(): void {
    this.router.navigate(['../login'], { relativeTo: this.activatedRoute });
  }

  ngOnInit(): void {
  }

}
