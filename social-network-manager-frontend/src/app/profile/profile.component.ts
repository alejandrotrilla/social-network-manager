import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ProfileService } from '../profile.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userdata? : any;
  hiddenPassword : boolean = true;

  constructor(
      private oidcSecurityService: OidcSecurityService,
      private profileService : ProfileService,
      private _snackBar: MatSnackBar,
      public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.oidcSecurityService.userData$.subscribe((data: any) => {
      this.userdata = data.userData;
    });
  }

  private showNotification(message : string) {
    this._snackBar.open(message, 'x', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  private showError(message : string) {
     this.dialog.open(ErrorDialogComponent, { data : { message: message } });
  }

  private showHttpError(message : string, errorMessage : string) {
    this.dialog.open(ErrorDialogComponent, { data : { message: message, errorMessage : errorMessage } });
  }
}
