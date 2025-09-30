import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = 'https://localhost:44388/api/auth/';

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel)
  {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiURL+"login",loginModel)
  }
  isAuthenticated()
  {
    if(localStorage.getItem("token")){
      return true;
    }else return false;
  }
}
