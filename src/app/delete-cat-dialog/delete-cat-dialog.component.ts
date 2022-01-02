import {Component, Inject, OnInit} from '@angular/core';
import {Cat} from "../cat.model";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from "@angular/router";


@Component({
  selector: 'app-delete-cat-dialog',
  templateUrl: './delete-cat-dialog.component.html',
  styleUrls: ['./delete-cat-dialog.component.scss']
})
export class DeleteCatDialogComponent implements OnInit {
  private catDoc: AngularFirestoreDocument<Cat>;

  constructor(private firestore: AngularFirestore,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: Cat,
              public dialogRef: MatDialogRef<DeleteCatDialogComponent>) { }

  ngOnInit(): void {
    this.catDoc = this.firestore.doc<Cat>('cats/' + this.data.id);
  }

  deleteCat(){
    this.catDoc.delete();
    this.closeDialog();
    this.gotoCats();
  }

  gotoCats(): void {
    this.router.navigate(['/cats']).then(r => {});
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
