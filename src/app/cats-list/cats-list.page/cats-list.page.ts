import {Component, OnDestroy, OnInit} from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, Subscription } from "rxjs";
import {MatDialog} from '@angular/material/dialog';
import {CatsService} from "../../cats.service";
import {Cat} from "../../cat.model";
import {AddCatDialogComponent} from "../../add-cat-dialog/add-cat-dialog.component";

@Component({
  selector: 'app-cats-list-page',
  templateUrl: './cats-list.page.html',
  styleUrls: ['./cats-list.page.scss']
})
export class CatsListPage implements OnInit, OnDestroy {

  cats$: Cat[];
  catsNumber: number = 0;
  catsSubscription: Subscription;

  constructor(private firestore: AngularFirestore, private catsService: CatsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.catsSubscription = this.catsService.catsChanged.subscribe((cats: Cat[]) => this.cats$ = cats);
    this.catsService.fetchCats();
  }

  addCatDialog() {
    this.dialog.open(AddCatDialogComponent);
  }

  addCat(cat: Cat) {
    this.catsService.addCat(cat);
  }

  ngOnDestroy(): void {
    this.catsSubscription.unsubscribe();
  }

}
