import {Cat} from "./cat.model";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {Subject} from "rxjs";
import {Observable, of} from "rxjs";

@Injectable()
export class CatsService {
  catsChanged = new Subject<Cat[]>();
  cats: Cat[] = [];

  constructor(private firestore: AngularFirestore) { }

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
        this.catsChanged.next([...this.cats])
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
