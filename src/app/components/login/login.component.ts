import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../services/http/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Permission } from '../../models/permission';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StoreService } from '../../services/store.service';
import { AuthFacade } from '../../services/auth.facade';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authFacade: AuthFacade = inject(AuthFacade);
  storeService: StoreService = inject(StoreService);
  router: Router = inject(Router);
  snackbar: MatSnackBar = inject(MatSnackBar);

  pattern: string = '\\w{5,}';

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('mattyk17', [
      Validators.required,
      Validators.pattern(this.pattern),
    ]),
    password: new FormControl('pass123', [
      Validators.required,
      Validators.pattern(this.pattern),
    ]),
  });

  constructor() {
    this.authFacade.user$.pipe(takeUntilDestroyed()).subscribe((user) => {
      if (user && user.permission !== Permission.NONE) {
        this.router.navigate(['home']);
      }
    });
  }

  performLogin() {
    //if (
    this.authFacade.performLogin(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
    //) {
    //  this.loginForm.markAsTouched();
    //  this.snackbar.open('Invalid Login Credentials', 'Close', {
    //    duration: 2000,
    //  });
    //}
  }
}