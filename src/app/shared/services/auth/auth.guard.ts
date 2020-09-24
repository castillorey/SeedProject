import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtManagerService } from '../jwt-manager/jwt-manager.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public authToken;
  private isAuthenticated = true; // Set this value dynamically
  
  constructor(
    private router: Router,
    private jwtAdmin: JwtManagerService
  ) {}
  canActivate() {
    if (this.jwtAdmin.IsAuthenticated) {
      return true
    }

    this.router.navigate(['/sessions/signin']);
    return false;
  }
}