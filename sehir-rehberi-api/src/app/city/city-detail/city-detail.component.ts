import { Component, OnInit } from "@angular/core";
import { CityService } from "src/app/services/city.service";
import { ActivatedRoute } from "@angular/router";
import { City } from "src/app/models/city";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from "ngx-gallery";
import "hammerjs";

@Component({
  selector: "app-city-detail",
  templateUrl: "./city-detail.component.html",
  styleUrls: ["./city-detail.component.css"],
  providers: [CityService]
})
export class CityDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private cityService: CityService
  ) {}

  city: City; 

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  getCityById(cityId: number) {
    this.cityService.getCityByIdService(cityId).subscribe(result => {
      this.city = result;     
      const imageUrls =[];
      for(let i = 0;i<this.city.photos.length;i++){
            imageUrls.push({
              small:this.city.photos[i].url,
              medium:this.city.photos[i].url,
              big:this.city.photos[i].url
            })}
            console.log("imageUrls",imageUrls)
      this.galleryImages=imageUrls;
    });
  }

  createNgGallery() {
    
    this.galleryOptions = [
      {
        width: "100%",
        height: "400px",
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: "100%",
        height: "600px",
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ]; 

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getCityById(params["cityId"]);      
      this.createNgGallery();
    });
  }
}
