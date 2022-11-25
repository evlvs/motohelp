import { AfterViewInit, Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  

  isLoading = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  private map!: L.Map;
  initialLat: number = -22.7996;
  initialLng: number = -43.3778;

  ngAfterViewInit(): void {
    this.getLocation();
    this.initMap();  
  }
  
  initMap() {
    this.map = L.map('map').setView([this.initialLat, this.initialLng], 16)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16
    }).addTo(this.map);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        console.log(position.coords.latitude)
        this.initialLat = position.coords.latitude
        this.initialLng = position.coords.longitude
      })
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
}
