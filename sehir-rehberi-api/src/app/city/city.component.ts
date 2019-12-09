import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';
import { City } from '../models/city';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  providers: [CityService]
})
export class CityComponent implements OnInit {

  constructor(private cityService:CityService) { }

  cities:City[];

getCities (){
 this.cityService.getCitiesService().subscribe(data=>{
   this.cities=data
 })
}

  ngOnInit() {
    this.getCities ();
  }

}
