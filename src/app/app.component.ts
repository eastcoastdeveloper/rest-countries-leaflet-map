import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { icon, latLng, Map, marker, point, polyline, MapOptions, Marker, tileLayer, map } from 'leaflet';
declare let L;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  mapOptions: MapOptions;
  borderingCountries:any;
  screenSize:number;
  selectedItem:any;
  countryName:any;
  capitalCity:any;
  nativeName: any;
  population: any;
  longitude:any;
  latitude:any;
  flag: any;
  map: Map;
  geo:any;

  userInteraction:boolean = false;
  projectIntro:boolean;
  filterMenu:boolean;

  searchTerm:string;

  americasFilter:any = [];
  countriesData:any = [];
  oceaniaFilter:any = [];
  africaFilter:any = [];
  europeFilter:any = [];
  masterArray:any = [];
  polarFilter:any = [];
  asiaFilter:any = [];

  @ViewChild('nationCount', {static:false}) nationCount:ElementRef;

  constructor(
    private http:HttpClient
  ) {}

  ngOnInit(){
    this.http.get<any>('https://restcountries.eu/rest/v2/all').subscribe(data => {
      this.masterArray = data;
      this.countriesData = this.masterArray.slice();
    })

    this.initializeMapOptions();
  }

  ngAfterViewChecked(){
    this.showNationCount()
  }

  onResize($event){
    this.screenSize = $event.target.innerWidth;
    console.log(this.screenSize)
  }

  showNationCount(){
    this.nationCount.nativeElement.innerHTML = '( ' + this.countriesData.length + ' )';
  }

  viewFilters(){
    this.filterMenu = !this.filterMenu;
  }
  
  filterAmericas(){
    this.setMaster()
    this.closeFilterMenu()
    this.americasFilter = this.countriesData.filter(function(item) {
      return item.region === 'Americas'
    });
    this.countriesData = this.americasFilter;
  }

  filterEurope(){
    this.setMaster()
    this.closeFilterMenu()
    this.europeFilter = this.countriesData.filter(function(item) {
      return item.region === 'Europe'
    });
    this.countriesData = this.europeFilter;
  }

  filterAfrica(){
    this.setMaster()
    this.closeFilterMenu()
    this.africaFilter = this.countriesData.filter(function(item) {
      return item.region === 'Africa'
    });
    this.countriesData = this.africaFilter;
  }

  filterAsia(){
    this.setMaster()
    this.closeFilterMenu()
    this.asiaFilter = this.countriesData.filter(function(item) {
      return item.region === 'Asia'
    });
    this.countriesData = this.asiaFilter;
  }

  filterOceania(){
    this.setMaster()
    this.closeFilterMenu()
    this.oceaniaFilter = this.countriesData.filter(function(item) {
      return item.region === 'Oceania'
    });
    this.countriesData = this.oceaniaFilter;
  }

  filterPolar(){
    this.setMaster()
    this.closeFilterMenu()
    this.polarFilter = this.countriesData.filter(function(item) {
      return item.region === 'Polar'
    });
    this.countriesData = this.polarFilter;
  }

  closeFilterMenu(){
    this.filterMenu = false;
  }

  setMaster(){
    this.countriesData = this.masterArray;
  }

  showAll(){
    this.closeFilterMenu()
    this.countriesData = this.masterArray;
  }

  onMapReady(map: Map) {
    this.map = map;
  }

  private addSampleMarker() {
    const marker = new Marker([51.51, 0])
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: '../../../assets/marker-icon-2x.png'
        }));
    marker.addTo(this.map);
  }

  private initializeMapOptions() {
    this.mapOptions = {
      center: latLng(38, -97),
      zoom: 4,
      layers: [
        tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: 'Map data © OpenStreetMap contributors'
          })
      ],
    };
  }

  selectItem(i:any, e:any){
    this.closeFilterMenu()
    this.clearString();
    var name = e.target.innerHTML;
    this.countriesData.map(function(index:any, val:any){
      if(index.name === name){
        i = val;
      }
    })

    this.setMarker(i)
    this.setDetails(i)
  }

  setMarker(i:any){
    this.userInteraction = true;
    this.longitude = this.countriesData[i].latlng[0];
    this.latitude = this.countriesData[i].latlng[1];

    const marker = new Marker([this.longitude, this.latitude])
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: '../../../assets/marker-icon-2x.png'
        }));
    marker.bindTooltip(this.countriesData[i].name).openTooltip();
        
    this.map.setView([this.longitude, this.latitude], 5)
    this.map.invalidateSize()
    this.markerHandler(marker)
  }

  markerHandler(pin:any){
    pin.addTo(this.map).addEventListener('click', function(event){
      this.selectedItem = event.sourceTarget._tooltip._content;
    })
  }

  setDetails(i:number){
    this.countryName = this.countriesData[i].name;
    this.capitalCity = this.countriesData[i].capital;
    this.flag = this.countriesData[i].flag;
    this.nativeName = this.countriesData[i].nativeName;
    this.population = this.countriesData[i].population;
    this.borderingCountries = this.countriesData[i].borders;
    this.geo = this.countriesData[i].region;
  }

  formatNumber(i:number){
    var nf = Intl.NumberFormat(),
      x = this.population,
      result = nf.format(x);
      return result
  }

  clearString(){
    this.searchTerm = '';
    this.setMaster()
  }

  projectDescription(){
    this.projectIntro = !this.projectIntro;
  }
 
  


}