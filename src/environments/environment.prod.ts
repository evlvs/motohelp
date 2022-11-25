import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  API_KEY: 'AIzaSyBBmTPg4czYtBAAUTPSh27ENatp9DcK3EA',
  HTTPOPT: {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    })
  }
};
