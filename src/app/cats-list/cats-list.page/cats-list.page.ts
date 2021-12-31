import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, Subscription } from "rxjs";
import {MatDialog} from '@angular/material/dialog';
import {CatsService} from "../../cats.service";
import {Cat} from "../../cat.model";
import {UIService} from "../../shared/ui.service";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-cats-list-page',
  templateUrl: './cats-list.page.html',
  styleUrls: ['./cats-list.page.scss']
})
export class CatsListPage implements OnInit {

  cats$: Cat[];
  catsNumber: number = 0;
  catsSubscription: Subscription;
  catsList$: Observable<{cats: Cat[]}>;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }


}
