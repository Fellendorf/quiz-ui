import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const API_BASE_URL = import.meta.env.NG_APP_API_URL;

  const apiRequest = req.clone({
    url: `${API_BASE_URL}${req.url}`,
    // headers: req.headers.set(
    //   'Authorization',
    //   `Bearer ${localStorage.getItem('token')}`,
    // ),
  });
  return next(apiRequest);
};
