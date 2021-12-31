import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CatsService } from "../../cats.service";
import { ActivatedRoute } from "@angular/router";
import { Cat } from "../../cat.model";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CatsStoreService } from "../../cats.store.service";

@Component({
  selector: 'app-cat-detail-page',
  templateUrl: './cat-detail.page.html',
  styleUrls: ['./cat-detail.page.scss']
})
export class CatDetailPage implements OnInit, OnDestroy, AfterViewInit {
  selectedCat$: Observable<Cat>;
  private readonly destroy$: Subject<void> = new Subject();

  constructor(
    private catsService: CatsService,
    private catsStoreService: CatsStoreService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.catsService.fetchCats();
    this.activeRoute.params.pipe(takeUntil(this.destroy$)).subscribe(routeParams => {
      this.getCat();
    });
  }

  ngAfterViewInit(): void {
    this.getCat();
  }

  getCat(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    // this.selectedCat$ = this.catsService.getCat(id);
    this.selectedCat$ = this.catsStoreService.getSelectedCat();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
