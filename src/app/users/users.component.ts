import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/User';
import { AuthentificationService } from '../Services/authentification.service';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  map: any;
  LocalisationTosend: any[] = [];
  @ViewChild('map') mapElement: any;
  listOfUsers: User[];
  mapType: string;
  typeOfMaps = [
    {
      number: 1,
      name: 'satellite',
    },
    {
      number: 2,
      name: 'roadmap',
    },
    {
      number: 3,
      name: 'hybrid',
    },
    {
      number: 4,
      name: 'terrain',
    },
  ];
  constructor(
    private userService: UsersService,
    private authenService: AuthentificationService
  ) {}

  ngOnInit(): void {
    this.map = new google.maps.Map(document.getElementById('googlemap'), {
      center: new google.maps.LatLng(37.084347366079, 9.53682647705076),
      zoom: 3,
      mapTypeId: this.mapType,
    });
    var searchInput = 'search_input';
    var autocomplete;
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById(searchInput) as HTMLInputElement,
      {
        types: ['geocode'],
      }
    );
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var near_place = autocomplete.getPlace();
      (<HTMLInputElement>document.getElementById('loc_lat')).value =
        near_place.geometry.location.lat();
      (
        (<HTMLInputElement>(
          document.getElementById('loc_long')
        )) as HTMLInputElement
      ).value = near_place.geometry.location.lng();

      document.getElementById('latitude_view').innerHTML =
        near_place.geometry.location.lat();
      document.getElementById('longitude_view').innerHTML =
        near_place.geometry.location.lng();
      this.myLatSearched = (<HTMLInputElement>(
        document.getElementById('loc_lat')
      )).value;
      this.myLangSearched = (<HTMLInputElement>(
        document.getElementById('loc_long')
      )).value;
      this.map = new google.maps.Map(document.getElementById('googlemap'), {
        center: new google.maps.LatLng(
          parseFloat(this.myLatSearched),
          parseFloat(this.myLangSearched)
        ),
        zoom: 13,
      });
      var marker = new google.maps.Marker({
        position: {
          lat: parseFloat(this.myLatSearched),
          lng: parseFloat(this.myLangSearched),
        },
        map: this.map,
        draggable: true,
        label: {
          text: ' ',
          color: 'blue',
          fontSize: '20px',
        },
        animation: google.maps.Animation.BOUNCE,
      });
      let localLatiLng = [];
      localLatiLng.push(
        parseFloat(this.myLatSearched),
        parseFloat(this.myLangSearched)
      );

      google.maps.event.addListener(marker, 'dragend', function () {
        this.myLatSearched = this.getPosition().lat();
        this.myLangSearched = this.getPosition().lng();
        console.log('dragend lat', this.myLatSearched);
        console.log('dragend lng', this.myLangSearched);
      });
    });
  }
  onSelectTypeOfMap(value) {
    console.log(value);
    this.mapType = value;
    this.map = new google.maps.Map(document.getElementById('googlemap'), {
      center: new google.maps.LatLng(37.084347366079, 9.53682647705076),
      zoom: 3,
      mapTypeId: this.mapType,
    });
  }
}
