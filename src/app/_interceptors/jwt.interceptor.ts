import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = JSON.parse(localStorage.getItem('loggedUser'));
        //Didn't get around to JWT
        console.log('made it');
        if (currentUser) {
            request = request.clone({
                setHeaders: { 
                    user: JSON.stringify({user: currentUser._id, role: currentUser.role})
                }
            });
        }
        return next.handle(request);
    }
}