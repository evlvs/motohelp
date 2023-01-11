import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  API_KEY: 'AIzaSyAfK5g3nTP-od0ep3iSIIDP8gG5Rb2mDQ4',
  HTTPOPT: {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    })
  }
};
