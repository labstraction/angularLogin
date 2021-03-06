import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  constructor(private auth: AuthService, private router: Router, private snack: MatSnackBar) {

  }

  ngOnInit(): void {}

  login(){
    this.snack.open("Loading...");
    this.auth.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next:(user) => {
        this.snack.dismiss()
        if (user) {
          this.router.navigate(["private"]);
        } else {
          this.snack.open("Utente non trovato", "", {
            duration: 2 * 1000,
          });
        }
      },
      error:(error)=>this.snack.open(error.message, "", {
        duration: 2 * 1000,
      })
    })
  }





}
