import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // ✅ Buradaki düzeltme önemli
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  login() {
    if (this.loginForm.valid) {
      const loginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModel).subscribe({
        next: (response) => {
          this.toastr.success(
        `<i class="bi bi-check-circle-fill"></i> Giriş Başarılı`,
        '', 
        {
          enableHtml: true,  // HTML kullanımını aktif et
          closeButton: true, // kapatma butonu
          progressBar: true, // progress bar
          timeOut: 2500,     // 3 saniye sonra kaybolur
          toastClass: 'ngx-toastr toast-success-custom' // opsiyonel özel stil
        }
        );      
          localStorage.setItem("token", response.token);
          localStorage.setItem("firstName", response.firstName);
          localStorage.setItem("lastName", response.lastname); // backend "lastname"
          localStorage.setItem("email", response.email);
          localStorage.setItem("expiration", response.expiration);
          this.router.navigate(['/products']); // ✅ giriş sonrası yönlendirme
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error);
        }
      });
    } else {
      this.toastr.warning("Lütfen tüm alanları doldurun.");
    }
  }
  goToRegister() {
    this.router.navigate(['/register']); // ✅ Üye ol sayfasına yönlendirme
  }
}
