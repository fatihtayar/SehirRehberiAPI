import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CityComponent } from "./city/city.component";
import { AboutComponent } from "./about/about.component";
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { CityAddComponent } from './city/city-add/city-add.component';

const routes: Routes = [ 
  { path: "addCity", component:CityAddComponent},
  { path: "cityDetail/:cityId", component: CityDetailComponent },
  { path: "city", component: CityComponent },
  { path: "about", component: AboutComponent },
  { path: "**", redirectTo: "city", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
