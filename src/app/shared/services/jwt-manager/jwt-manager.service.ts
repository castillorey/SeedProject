import { Injectable } from '@angular/core';
import { IJWTDecoded } from 'app/shared/interfaces/ijwtdecoded';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtManagerService {

  private rawToken:     string;
  private decodedToken: IJWTDecoded;
  private jwtHelper:    JwtHelperService;

  constructor(
    private router:     Router
  ) { 
    this.jwtHelper = new JwtHelperService();
    const token    = this.getRawToken();
    if (token) {
      this.rawToken     = token;
      this.validateRolesType();
    } else {
      this.rawToken = undefined;
      this.clearToken();
    }
  }

  get IsAuthenticated(): boolean {
    // return (this.rawToken && this.rawToken.length > 0) && !this.jwtHelper.isTokenExpired(this.rawToken);
    return this.rawToken && !this.jwtHelper.isTokenExpired(this.rawToken);
  }

  getTokenDecoded(): IJWTDecoded {
    return this.decodedToken;
  }

  validateRolesType() {
    const tempToken = this.jwtHelper.decodeToken(this.rawToken);
      if (!Array.isArray(tempToken.Roles)) {
        tempToken.roles = [ tempToken.Roles ];
      }
      tempToken.Roles = tempToken.Roles;
      delete tempToken.roles;
      this.decodedToken = <IJWTDecoded>tempToken;
  }

  getRawToken(): string {
    let token = this.rawToken;
    if (token && token != 'undefined' && token.length <= 0) {
      return token;
    }

    token = sessionStorage.getItem('token');
    if (!token || token == 'undefined') {
      token = localStorage.getItem('token');
      if (token && token != 'undefined') {
        sessionStorage.setItem('token', token);
      }
    }

    if (token && token != 'undefined') {
      this.rawToken = token;
      return this.rawToken;
    } else {
      this.clearToken();
      return undefined;
    }
  }

  clearToken(): void {
    this.decodedToken = undefined;
    this.rawToken     = undefined;
    localStorage.clear();
    sessionStorage.clear();
  }

  logOut(): void {
    this.clearToken();
    this.router.navigate(['/sessions/signin']);
    // this.navService.ChangeNavigationMenu([]);
  }

  saveJWT(token: string, savePermanent: boolean): void {
    this.rawToken     = token;
    this.validateRolesType();
    sessionStorage.setItem('token', this.rawToken);
    if (savePermanent) {
      localStorage.setItem('token', this.rawToken);
    }
    // this.navService.ChangeNavigationMenu(this.decodedToken.Roles);
  }
}
