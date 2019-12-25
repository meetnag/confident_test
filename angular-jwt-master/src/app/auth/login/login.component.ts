import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/shared/_services';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CookieService } from 'angular2-cookie/core';
import { ToastrService } from 'ngx-toastr';


@Component({ templateUrl: 'login.component.html', providers: [CookieService] })
export class LoginComponent implements OnInit {

    email = '';
    password = '';
    remember = '';
    public userForm: FormGroup;
    constructor(private router: Router, private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder, private _cookieService: CookieService, private toaster: ToastrService) {
        if (_cookieService.get('remember') === 'true') {

            this.remember = (this._cookieService.get('remember'));
            this.email = (this._cookieService.get('username'));
            this.password = (this._cookieService.get('password'));
        }
    }

    ngOnInit(): void {
        this.userForm = this.formBuilder.group({
            // Validators.email
            email: [this.email, [Validators.required]],
            password: [this.password, [Validators.required, Validators.minLength(4)]],
            remember: [this.remember]
        });
    }

    get user() { return this.userForm.controls; }

    login(): void {
        if (this.userForm.controls['remember'].value) {
            this._cookieService.put('username', this.userForm.controls['email'].value);
            this._cookieService.put('password', this.userForm.controls['password'].value);
            this._cookieService.put('remember', this.userForm.controls['remember'].value);

        } else {
            this._cookieService.remove('username', this.userForm.controls['email'].value);
            this._cookieService.remove('password', this.userForm.controls['password'].value);
            this._cookieService.remove('remember', this.userForm.controls['remember'].value);
        }
        let email = this.userForm.controls['email'].value;
        let password = this.userForm.controls['password'].value;
        this.authenticationService.login(email, password).subscribe(data => {
            if (data != null) {
                this.toaster.success("Logged in Successfully!!");
                this.router.navigate(['/pages/oc-list']);
            } else {
                this.toaster.error("Invalid Username or Password.");
            }
            this.userForm.reset();
        });
    }
}
