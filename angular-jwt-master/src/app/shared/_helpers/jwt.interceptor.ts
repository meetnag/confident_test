import {
    Injectable
} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpClient,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import {
    Observable
} from 'rxjs';
import {
    AuthenticationService
} from '../_services';
import {
    Router
} from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    currentUserToken: any;
    ipAddress: any = '';
    currentUser :any;
    currentUserName :any;
    constructor(private authenticationService: AuthenticationService, private router: Router) {
        this.authenticationService.currentUserSubject.subscribe(data => {
            if (data != null) {
                this.currentUserToken = data.token;
                this.currentUser = data.user.email;
                this.currentUserName = data.user.name;

            }
        })
        this.authenticationService.ipAddress.subscribe(data => {
            if (data != null) {
                this.ipAddress = data;
            }
        })
    }

    intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
        if (this.currentUserToken) {
            request = request.clone({
                setHeaders: {
                    'x-access-token': `${this.currentUserToken ? this.currentUserToken : ''}`,
                    'x-auth-useragent': this.ipAddress,
                    'x-auth-user':this.currentUser,
                    'x-auth-username':this.currentUserName
                }
            });
        }
        return next.handle(request)
            .do((event: HttpEvent < any > ) => {
                if (event instanceof HttpResponse) {}
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    // console.log("dsad",err)
                    if (err.status === 401) {
                        this.authenticationService.logout();
                        // this.toasterService.error('Token Expired!');
                        this.router.navigate(['/login']);
                    }
                }
            });
    }
}