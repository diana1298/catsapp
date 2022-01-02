import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { Cat } from "../../cat.model";

@Component({
  selector: 'app-cats-list-page',
  templateUrl: './cats-list.page.html',
  styleUrls: ['./cats-list.page.scss']
})
export class CatsListPage implements OnInit {

  cats$: Cat[];
  catsNumber: number = 0;
  catsSubscription: Subscription;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

}
