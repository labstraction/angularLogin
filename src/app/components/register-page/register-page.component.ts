import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidators } from 'src/app/services/Validators/CustomValidators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), CustomValidators.hasSpecialChar]),
    pswConfirm: new FormControl("", [Validators.required, Validators.minLength(8), this.hasSpecialChar]),
    mail: new FormControl("", [Validators.required]),
    dob: new FormControl("", [Validators.required]),
  }, CustomValidators.MustMatch("password", "pswConfirm"));


  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  register(){
    const newUser: User = {username: this.registerForm.value.username,
                          password:this.registerForm.value.password,
                          mail: this.registerForm.value.mail,
                          dob: new Date(this.registerForm.value.dob).getTime()}
    this.auth.register(newUser).subscribe({
      next:(user) => console.log(user),
      error: err => console.log(err)
    });
  }

  hasSpecialChar(control: AbstractControl): ValidationErrors | null{
        
    if (control.value.includes("!")) {
        return null;
    } else {
        return {"hasExclamationMark": true}
    }
  }

}
