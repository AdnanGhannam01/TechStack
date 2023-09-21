import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'docs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading = false;

  constructor(private authService: AuthService,
    private messageService: MessageService,
    private router: Router) { }

  login(name: string, password: Nullable<string>) {
    if (name && password) {
      this.loading = true;
      this.authService.login(name, password, (res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Success' });
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      }, (err) => {
        this.loading = false;
        err.error.errors.forEach(
          (error: any) => 
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
      });
    }
  }
}
