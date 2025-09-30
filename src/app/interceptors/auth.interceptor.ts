import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem("token")
  let newReq : HttpRequest<any>;
  newReq = req.clone({
    headers: req.headers.set("Authorization","Bearer "+token)
  })
  return next(newReq);
  
};
