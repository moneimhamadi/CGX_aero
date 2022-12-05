import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss'],
})
export class LeafletMapComponent implements OnInit {
  map;
  constructor() {}

  ngOnInit(): void {
    this.map = L.map('map').setView([35.5848, 0.6], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    L.marker([33.5848, 9.3224])
      .addTo(this.map)
      .bindPopup('Tunisia<br>')
      .openPopup();
  }
}
