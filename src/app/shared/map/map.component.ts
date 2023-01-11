import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { BudgetService } from 'src/app/budget/budget.service';
// require("lrm-google");
// import 'lrm-google';
// import 'lrm-google';

const squareIcon = new L.Icon({
  iconUrl: '/assets/endMarker.svg',
  shadowUrl: '/assets/shadow.svg',
  iconSize: [20, 20],
  shadowSize: [0, 0],
  shadowAnchor: [0, 0]
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnChanges {
  isLoading = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  private map!: L.Map;
  initialLat: number = -22.7996;
  initialLng: number = -43.3778;
  @Input() route!: any;
  marker!: L.Marker;
  distance!: number;
  time!: number;
  price!: number;
  @Output() enviaForm =  new EventEmitter();

  constructor(public service: BudgetService) {
    // this.service.rotaFormGroup.controls['origem'].setErrors({'incorrect': true});

  }

  async ngOnChanges(changes: SimpleChanges) {
    let waypoints: L.LatLng[] = [];
    console.log(changes['route'])
    if(changes['route'].currentValue !== changes['route'].previousValue) {
      await changes['route'].currentValue.waypoints.map((e: any) => {
        let route = e.location.reverse()
        waypoints.push(new L.LatLng(route[0], route[1]))
      })
      if(waypoints.length >= 1) {
        let routeControl = L.Routing.control({
          waypoints: waypoints,
          lineOptions: {
            styles: [{color: '#DE1C1D', opacity: 1, weight: 6}],
            extendToWaypoints: false,
            missingRouteTolerance: 0
          },
          plan: L.Routing.plan(waypoints, {
            createMarker: function(i, wp) {
              if(i === 0) {
                return L.marker(wp.latLng, {
                  draggable: true,
                  icon: L.icon({
                    iconUrl: '/assets/marker.svg',
                    shadowUrl: '/assets/shadow.svg',
                    iconSize: [90, 90],
                    iconAnchor: [45, 45],
                    shadowSize: [0, 0],
                    shadowAnchor: [0, 0]
                  })
                });  
              } else {
                return L.marker(wp.latLng, {
                  draggable: true,
                  icon: L.icon({
                    iconUrl: '/assets/endMarker.svg',
                    shadowUrl: '/assets/shadow.svg',
                    iconSize: [20, 20],
                    shadowSize: [0, 0],
                    shadowAnchor: [0, 0]
                  })
                });
              }
            },
            routeWhileDragging: true
          }),
      

        })
        routeControl.on('routesfound', (e) => {
          var routes = e.routes;
          var summary = routes[0].summary;
          console.log(routes[0])
          this.distance = summary.totalDistance / 1000;
          this.time = Math.round(summary.totalTime % 3600 / 60);
          console.log(waypoints.length)
          if(this.distance <= 8) {
            this.price = 25 + ((waypoints.length - 2) * 5)
            this.price = Math.round(this.price)
          } else {
            this.price = (25 + ((this.distance - 8) * 3) + ((waypoints.length - 2) * 5))
            this.price = Math.round(this.price)
          }
          // alert('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
          this.enviaForm.emit({
            distance: this.distance.toFixed(2),
            time: this.time,
            price: this.price.toFixed(2)
           })
        })


        routeControl.addTo(this.map);
      }

     
    }
  }

  ngAfterViewInit(): void {
    this.getLocation();
    this.initMap();  

    this.marker = L.marker([this.initialLat, this.initialLng])
    let leaftTop = document.querySelectorAll('.leaflet-top');
    for(let box of Array.of(leaftTop)) {
      // let element = box as HTMLElement;
      box[1].classList.add('hide-box')
    }
    // let hideBox = document.querySelector('.hide-box') as HTMLElement;
    // hideBox.addEventListener('onchange', function() {
    //  })

    // hideBox.classList.add('hide-box')
  }
  
  initMap() {
    this.map = L.map('map').setView([this.initialLat, this.initialLng], 12)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16
    }).addTo(this.map);
  }

  getLocation() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
    //     this.initialLat = position.coords.latitude
    //     this.initialLng = position.coords.longitude
    //   })
    // } else {
    //   console.log("Geolocation is not supported by this browser.");
    // }
    this.initialLat = -22.9187318;
    this.initialLng = -43.2184567
    this.marker = L.marker([this.initialLat, this.initialLng])

  }

  getDistance(e: any) {

  }
}
