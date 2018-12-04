import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
      let user: User = {
        firstname: 'Jesse',
        lastname: 'Wheeler',
        email: 'jesse.wheeler@georgebrown.ca',
        password: 'p@ssw0rd',
        role: 1,
        created_on: new Date
      }
      /*
        return this.http.post<any>('/api/users/login', { email, password })
            .pipe(map(user => {
                if (user && user.token) {
                    localStorage.setItem('loggedUser', JSON.stringify(user));
                }

                return user;
            }));
            */
      return (email === user.email && password === user.password) ? user : null;
    }

    logout() {
        localStorage.removeItem('loggedUser');
    }
}