import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from '@services/authentication/authentication.service';
import { mockRoutes } from '../../assets/mocks/mockRoutes';
import { environment } from '@env/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const url = request.url.split('?');
    const token = this.authenticationService.getToken();

    if (mockRoutes[url[0]]){
      request = new HttpRequest('GET', mockRoutes[url[0]] );
    }else if(request.url.indexOf('assets') === -1 ){
      let prevUrl = environment.back_url;
      if(environment.back_port){ prevUrl += `:${environment.back_port}`; }
      request = request.clone({ url: prevUrl+request.url});
    }

    let authReq: any = null;
    if(token && token !== 'undefined'){
      authReq = request.clone({
        headers: request.headers
          .set('Token', token)
      });
    }else{
      authReq = request.clone({
        headers: request.headers
      });
    }

    return next.handle(authReq);
  }
}
