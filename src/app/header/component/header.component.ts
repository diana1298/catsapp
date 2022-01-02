import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
import { ActivatedRoute } from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  catListCount: number;
  catList: Cat[];
  catsNumber: number = 0;
  catsSubscription: Subscription;
  catList$: Observable<Cat[]>;
  private readonly destroy$: Subject<void> = new Subject();

  @Input('catsList') set _catListRef(catsStore: any) {
    this.catList = catsStore.catsList.cats;
    this.catListCount = catsStore.catsList.catCount;
  }

  constructor(private firestore: AngularFirestore,
              private catsService: CatsService,
              public router: Router,
              private store: Store<{catsList: { cats: Cat[] }}>,
              private catsStoreService: CatsStoreService,
              private activeRoute: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addCatDialog() {
    this.dialog.open(AddCatDialogComponent, {
      data: {editMode: false}
    });
  }

  gotoCatDetail( cat: Cat): void {
    // this.router.navigate(['/cat', id]).then(r => {});
    this.catsStoreService.setSelectedCat(cat);
  }

  ngOnDestroy(): void {
    this.catsSubscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

}
