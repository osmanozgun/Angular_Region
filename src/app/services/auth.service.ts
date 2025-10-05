import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { TotalModel } from '../models/totalModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { RegisterModel } from '../models/registerModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = 'https://localhost:44388/api/auth/';

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel)
  {
    return this.httpClient.post<TotalModel>(this.apiURL+"login",loginModel)
  }
  register(registerModel:RegisterModel)
  {
    return this.httpClient.post<TokenModel>(this.apiURL+"register",registerModel)
  }
  isAuthenticated()
  {
    if(localStorage.getItem("token")){
      return true;
    }else return false;
  }
}
