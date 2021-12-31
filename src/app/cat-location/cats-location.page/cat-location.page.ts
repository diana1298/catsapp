import { Component, OnInit } from '@angular/core';
import { Cat } from "../../cat.model";
import { CatsService } from "../../cats.service";
import { Subscription, Observable } from "rxjs";
import {CatsStoreService} from "../../cats.store.service";

@Component({
  selector: 'app-cat-location-page',
  templateUrl: './cat-location.page.html',
  styleUrls: ['./cat-location.page.scss']
})
export class CatLocationPage implements OnInit {

  cats$: Cat[];
  catsSubscription: Observable<Cat[]>;
  catList$: Observable<any>;

  constructor(private catsStoreService: CatsStoreService,) { }

  ngOnInit(): void {
    // this.catsSubscription = this.catsService.catsChanged.subscribe((cats: Cat[]) => this.cats$ = cats);
    // this.catsService.fetchCats();
    this.catList$ = this.catsStoreService.getCatsList();
  }

}
