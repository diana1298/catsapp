import {Component, OnDestroy, OnInit} from '@angular/core';
import {Cat} from "../cat.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CatsService} from "../cats.service";
import {MatDialog} from "@angular/material/dialog";
import {AddCatDialogComponent} from "../add-cat-dialog/add-cat-dialog.component";
import {Subscription} from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  cats: Cat[] = [];
  catsNumber: number = 0;
  catsSubscription: Subscription;

  constructor(private firestore: AngularFirestore,
              private catsService: CatsService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.catsSubscription = this.catsService.catsChanged.subscribe((cats: Cat[]) => this.cats = cats);
    this.catsService.fetchCats();
  }

  addCatDialog() {
    this.dialog.open(AddCatDialogComponent, {
      data: {editMode: false}
    });
  }

  gotoCatDetail(id: any): void {
    this.router.navigate(['/cat', id]).then(r => {});
  }

  ngOnDestroy(): void {
    console.log('destroyed')
    this.catsSubscription.unsubscribe();
  }

}
