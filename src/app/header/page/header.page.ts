import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cat } from "../../cat.model";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { CatsService } from "../../cats.service";
import { MatDialog } from "@angular/material/dialog";
import { AddCatDialogComponent } from "../../add-cat-dialog/add-cat-dialog.component";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { CatsStoreService } from "../../cats.store.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-header-page',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss']
})
export class HeaderPage implements OnInit, OnDestroy {

  cats: Cat[] = [];
  catsNumber: number = 0;
  catsSubscription: Subscription;
  catList$: Observable<any>;

  constructor(private firestore: AngularFirestore,
              private catsService: CatsService,
              private router: Router,
              private store: Store<{catsList: { cats: Cat[] }}>,
              private catsStoreService: CatsStoreService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.catsService.fetchCats();
    this.catsStoreService.getCats();
    this.catList$ = this.catsStoreService.getCatsList();

  }

  addCatDialog() {
    this.dialog.open(AddCatDialogComponent, {
      data: {editMode: false}
    });
  }

  ngOnDestroy(): void {
  }

}
