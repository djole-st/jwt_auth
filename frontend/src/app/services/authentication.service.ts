import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  submitRegister(body: any){
    console.log(body);
    return this.http.post('http://localhost:3000/users/register', body, {
      observe: 'body'
    });
  }
  // tslint:disable-next-line:typedef
  login(body: any){
    console.log(body);
    return this.http.post('http://localhost:3000/users/login', body, {
      observe: 'body'
    });
  }
  // tslint:disable-next-line:typedef
  getUserName() {
    return this.http.get('http://localhost:3000/users/username', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

}
