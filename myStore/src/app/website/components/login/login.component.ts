import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @Output() userLogin = new EventEmitter<User>();

  formulario: FormGroup;
  usuarioLogin = {
    email: '',
    password: '',
  };

  token:any;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formulario = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get emailNoValido() {
    return this.formulario.get('email')?.invalid && this.formulario.get('email')?.touched
  }

  get passwordNoValido() {
    return this.formulario.get('password')?.invalid && this.formulario.get('password')?.touched
  }

  createUser() {
    this.userService.create({
      name: 'Leod',
      email: 'leos@asd.com',
      password: '123456',
    });
  }

  login() {
    this.usuarioLogin = {
      email: this.formulario.controls['email'].value,
      password: this.formulario.controls['password'].value,
    };

    if (this.formulario.valid) {
      this.authService
        .loginAndGet(this.usuarioLogin.email, this.usuarioLogin.password)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.token = data;
            console.log(this.token.access_token)
            Swal.fire({
              title: 'Success',
              text: 'Usuario logueado con éxito!',
              icon: 'success',
              confirmButtonText: 'Accept',
            });
            this.getProfile();
            this.router.navigate(['/profile']);
          },
          error: (data) => {
            Swal.fire({
              title: 'Error!',
              text: data.error.message,
              icon: 'error',
              confirmButtonText: 'Accept',
            });
            console.log(data);
          },
        });
    }
  }

  getProfile(){
    this.authService.getProfile()
    .subscribe( profile => {
      console.log(profile)
    })
  }

  navigateTo(param: any) {
    this.router.navigateByUrl(param);
  }

}
