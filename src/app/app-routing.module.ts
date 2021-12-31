import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CatsListComponent} from "./cats-list/cats-list-component/cats-list.component";
import {CatDetailPage} from "./cat-detail/cat-detail.page/cat-detail.page";
import {CatLocationPage} from "./cat-location/cats-location.page/cat-location.page";

const routes: Routes = [
  { path: '', redirectTo: '/cats', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'cats', component: CatsListComponent },
  { path: 'cat/:id', component: CatDetailPage },
  { path: 'locations', component: CatLocationPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
