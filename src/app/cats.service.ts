import {Cat} from "./cat.model";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {Subject} from "rxjs";
import {Observable, of} from "rxjs";
import { Store } from "@ngrx/store";
import { State } from "./store/cats.reducer"
import * as CatActions from './store/cats.actions'
import {CatsStoreService} from "./cats.store.service";

@Injectable()
export class CatsService {
  catsChanged = new Subject<Cat[]>();
  cats: Cat[] = [];

  constructor(private firestore: AngularFirestore,
              private catsStoreService: CatsStoreService,
              private store: Store<{ui: State}>) { }

  fetchCats(): void {
    this.firestore
      .collection('cats')
      .snapshotChanges()
      .pipe(map(data => {
          return data.map(cat => {
            return {
              id: cat.payload.doc.id,
              ...cat.payload.doc.data() as {}
            }
          })
        })
      ).subscribe((cats: any) => {
        this.cats = cats;
        this.catsStoreService.setCats(cats);
        // this.store.dispatch(CatActions.SetCats(cats));
        // this.catsChanged.next([...this.cats])
    });
  }

  getCat(id: string | null): Observable<Cat> {
    const cat = this.cats.find(c => c.id === id)!;
    return of(cat);
  }

  addCat(cat: Cat): void {
    this.firestore.collection('cats').add(cat);
  }


}
