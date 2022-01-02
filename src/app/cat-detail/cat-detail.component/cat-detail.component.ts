import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CatsService} from "../../cats.service";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import {Cat} from "../../cat.model";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {AddCatDialogComponent} from "../../add-cat-dialog/add-cat-dialog.component";
import {DeleteCatDialogComponent} from "../../delete-cat-dialog/delete-cat-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-cat-detail',
  templateUrl: './cat-detail.component.html',
  styleUrls: ['./cat-detail.component.scss']
})
export class CatDetailComponent implements OnInit, OnDestroy {

  public catSubscribe$: Subject<Cat> = new Subject();
  private readonly destroy$: Subject<void> = new Subject();
  selectedCat: Cat;

  // @Input() cat: Cat;

  @Input('cat') set _selectedCatRef(cat: Cat) {
    this.selectedCat = cat;
  }

  constructor(private catsService: CatsService,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  deleteCatDialog(cat: Cat): void {
    this.dialog.open(DeleteCatDialogComponent, {
      data: cat,
    });
  }

  editCatDialog(cat: Cat): void {
    this.dialog.open(AddCatDialogComponent, {
      data: {cat, editMode: true}
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
