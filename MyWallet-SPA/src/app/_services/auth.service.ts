import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;   
  jwtHelper = new JwtHelperService();
  decodedToken : any;

  constructor(private http: HttpClient) { 
    let storedToken = sessionStorage.getItem("token");

    if(storedToken){
      this.decodedToken = this.jwtHelper.decodeToken(storedToken);
      sessionStorage.setItem("username", this.decodedToken.unique_name);
    }
  }
  

  registerUser(username:string, email: string, password:string){
    const userData = {
      username, email, password
    }

    return this.http.post(this.baseUrl + "account/register", userData);
  }

  login(username: string, password: string){
   
    const userLoginData = "username=" + username + "&password=" + password + "&grant_type=password";

    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    
    return this.http.post(this.baseUrl + "Token", userLoginData , {
      headers : headers
    })
    .pipe(
      map((response: any) =>{
        const token = response;
        
        if(token){
          sessionStorage.setItem("token", token.access_token);
          this.decodedToken = this.jwtHelper.decodeToken(token.access_token);
          sessionStorage.setItem("username", this.decodedToken.unique_name);
        }
      })
    );
  }

  loggedIn() : boolean{
    const token = sessionStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserName() : string{
    return sessionStorage.getItem("username");
  }

}
