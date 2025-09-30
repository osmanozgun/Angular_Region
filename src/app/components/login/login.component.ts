import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validator, Form, Validators} from "@angular/forms"
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor (private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastr:ToastrService) {}

  ngOnInit(): void {
    this.createLoginForm();

  }
  createLoginForm() {

      this.loginForm = this.formBuilder.group({
        email:["",Validators.required],
        password: ["",Validators.required]
      })    
  }
  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      let loginModel = Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.toastr.info(response.message)

        localStorage.setItem("token",response.data.token)
        
      },ResponseError=>{
        this.toastr.error(ResponseError.error)
      })
    }
  }
}
