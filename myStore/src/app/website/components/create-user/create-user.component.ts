import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnExit } from 'src/app/guards/exit.guard';
import { CreateUserDto } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit, OnExit {

  formulario: FormGroup;
  usuario: CreateUserDto;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formulario = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['',Validators.required]
    });
  }

  createUser() {
    this.usuario = {
      email: this.formulario.controls['email'].value,
      password: this.formulario.controls['password'].value,
      name: this.formulario.controls['name'].value
    };

    if (this.formulario.valid) {
      this.userService
        .create(this.usuario)
        .subscribe({
          next: (data) => {
            console.log(data);
            Swal.fire({
              title: 'Success',
              text: 'Usuario creado con éxito!',
              icon: 'success',
              confirmButtonText: 'Accept',
            });
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

  get emailNoValido() {
    return this.formulario.get('email')?.invalid && this.formulario.get('email')?.touched
  }

  get passwordNoValido() {
    return this.formulario.get('password')?.invalid && this.formulario.get('password')?.touched
  }

  get nombreNoValido() {
    return this.formulario.get('name')?.invalid && this.formulario.get('name')?.touched
  }

  onExit(){
    const rta = confirm('Estás seguro que deseas salir?');
    return rta;
  }

}
