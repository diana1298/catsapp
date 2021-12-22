import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CatsListComponent} from "./cats-list/cats-list-component/cats-list.component";
import {CatDetailComponent} from "./cat-detail/cat-detail.component/cat-detail.component";
import {CatDetailPage} from "./cat-detail/cat-detail.page/cat-detail.page";

const routes: Routes = [
  { path: '', redirectTo: '/cats', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'cats', component: CatsListComponent },
  { path: 'cat/:id', component: CatDetailPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
