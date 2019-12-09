import { Injectable } from "@angular/core";
import { City } from "../models/city";
import { Observable, throwError } from "rxjs";
import { tap, catchError, subscribeOn } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AlertifyService } from './alertify.service';
import { Router } from "@angular/router";

@Injectable()
export class CityService {
  constructor(private httpClient: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router) { }

  path = "http://localhost:65331/api/Cities";

  getCityByIdService(cityId: number): Observable<City> {
    return this.httpClient
      .get<City>(this.path + "/Details/?cityId=" + cityId)
      .pipe(
        tap(data => console.log("Şehir", cityId, data)),
        catchError(this.handleError)
      );
  }

  getCitiesService(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.path).pipe(
      tap(data => console.log("şehirler", data)),
      catchError(this.handleError)
    );
  }

  addCityService(city) {
    return this.httpClient.post<City>(this.path + "/Add", city).pipe(
      tap(result => {
        this.alertifyService.success(result.name + "şehri başarı ile eklendi")
        this.router.navigateByUrl('/cityDetail/' + result.id)
      }
      ),
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      errorMessage = "Bir hata oluştu" + err.error.message;
    } else {
      errorMessage = "Server bağlantısı sağlanamadı.";
    }
    return throwError(errorMessage);
  }
}
