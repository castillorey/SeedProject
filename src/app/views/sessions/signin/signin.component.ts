import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { RestApiService } from 'app/shared/services/rest-api/rest-api.service';
import { JwtManagerService } from 'app/shared/services/jwt-manager/jwt-manager.service';
import { Router } from '@angular/router';
import { ICommonResponse } from 'app/shared/interfaces/api/icommon-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;
  errMessage: string;

  constructor(
    private restAPIService: RestApiService,
    private jwtAdmin:       JwtManagerService,
    private router:         Router,
  ) { }

  ngOnInit() {
    if(this.jwtAdmin.IsAuthenticated)
      this.router.navigate(['/'])

    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    })
  }

  onSubmit() {
    const signinData = this.signinForm.value
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';

    this.restAPIService.Post('Session/Login',{
      Username: signinData.username,
      Password: signinData.password,
      Domain:   'AMER'
    })
    .subscribe((response: ICommonResponse) =>{
      this.jwtAdmin.saveJWT(response.Data, signinData.rememberMe)
      this.router.navigate(['/']);
      this.progressBar.mode      = 'determinate';
    },(error:HttpErrorResponse) =>{
      this.submitButton.disabled = false;
      this.progressBar.mode      = 'determinate';
      console.error('SigninComponent: ResponseError object', error);
      const e = <ICommonResponse>error.error;
      switch (error.status) {
        case 500: this.errMessage = 'Internal server error, contact your system admin'; break;
        default:  this.errMessage = e.Message; break;
      }
    })
  }

}
