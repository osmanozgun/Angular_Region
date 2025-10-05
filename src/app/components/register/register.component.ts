import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  ngOnInit(): void {
   this.createRegisterForm();
  }
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
     private router: Router,
      private authService: AuthService,
       private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required,]],
      Password: ['', Validators.required]
    });
  }
  register() {
    if (this.registerForm.valid) {
      const registermodel = Object.assign({}, this.registerForm.value);

      this.authService.register(registermodel).subscribe({
        next: (response) => {
          this.toastr.info("Kayıt başarılı",response.expiration);
          this.router.navigate(['/']);
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error);
        }
      });
    } else {
      this.toastr.warning("Lütfen tüm alanları doldurun.");
    }
    
  }
}
