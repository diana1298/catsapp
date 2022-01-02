import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, Subscription } from "rxjs";
import {MatDialog} from '@angular/material/dialog';
import {CatsService} from "../../cats.service";
import {Cat} from "../../cat.model";
import {AddCatDialogComponent} from "../../add-cat-dialog/add-cat-dialog.component";

@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.scss']
})
export class CatsListComponent implements OnInit, OnDestroy {

  catsNumber: number = 0;
  catsSubscription: Subscription;

  @Input() cats: Cat[];

  constructor() { }

  ngOnInit(): void {

  }



  ngOnDestroy(): void {
    // this.catsSubscription.unsubscribe();
  }

}
