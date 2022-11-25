import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

const API = environment.API_KEY;
const httpOptions = environment.HTTPOPT;

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  rotaFormGroup = this._formBuilder.group({
    origem: ['', Validators.required],
    points: this._formBuilder.array([]),
    destino: ['', Validators.required],
  });
  custoFormGroup = this._formBuilder.group({
    dataInicioVigencia: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder, private http: HttpClient) { }

  async getLatLng(address: string) {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API}`)
  }

  async getRoute(rota: string) {
    return this.http.get(`https://router.project-osrm.org/route/v1/driving/${rota}?overview=full&geometries=geojson`)
  }
}
