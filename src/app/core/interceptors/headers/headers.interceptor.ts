import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { EMPTY } from 'rxjs';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {


  const platformId = inject(PLATFORM_ID);

  if(!isPlatformBrowser(platformId)){
    return EMPTY
  }

  const token = localStorage.getItem('token');

  if(token && req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist')){

    req= req.clone({
            setHeaders:{
              token: localStorage.getItem('token')!
            }
          });

  }


  return next(req);
};
