import {Component, Inject, OnInit} from '@angular/core';
import {Cat} from "../cat.model";
import {FormControl, FormGroupDirective, FormGroup, NgForm, Validators} from '@angular/forms';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-cat-dialog',
  templateUrl: './add-cat-dialog.component.html',
  styleUrls: ['./add-cat-dialog.component.scss']
})
export class AddCatDialogComponent implements OnInit {

  newCat: Cat;
  maxDate: Date;
  newCatForm: FormGroup;
  private catDoc: AngularFirestoreDocument<Cat>;

  constructor(private firestore: AngularFirestore,
              @Inject(MAT_DIALOG_DATA) public data: {cat: Cat, editMode: boolean},
              public dialogRef: MatDialogRef<AddCatDialogComponent>) { }

  ngOnInit(): void {
    console.log(this.data)
    let birthDate = null;
    if(this.data.cat) {
      birthDate = this.calculateBirth(this.data.cat.age);
      console.log(birthDate)
      this.catDoc = this.firestore.doc<Cat>('cats/' + this.data.cat.id);
    }
    this.maxDate = new Date();
    this.newCatForm = new FormGroup({
      name: new FormControl(this.data?.cat?.name || '', [
        Validators.required
      ]),
      gender: new FormControl(this.data?.cat?.gender || '', [
        Validators.required
      ]),
      birthdate: new FormControl(  birthDate || '', [
        Validators.required,
      ]),
      likes: new FormControl(this.data?.cat?.likes || '', []),
      colors: new FormControl(this.data?.cat?.colors || '', []),
      imgPath: new FormControl(this.data?.cat?.imgPath || '', [])
    });
  }

  calculateAge(birth: Date): number {
    if(birth) {
      const diff_ms = Date.now() - birth.getTime();
      const age_dt = new Date(diff_ms);
      return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
    return 3; //a 3 year default age will be returned
  }

  calculateBirth(age: number): Date {
    if(age) {
      const ageInMillis = age * 31556952000;
      const diff = new Date().getTime() - ageInMillis;
      const dateOfBirth = new Date(diff);
      return dateOfBirth;
    }
    return new Date();
  }

  addNewCat() {
    const newCat = this.buildCat();
    console.log(newCat)
    this.firestore.collection('cats').add(newCat).then(r => console.log('Success'));
    this.closeDialog();
  }

  updateCat(): void {
    const editedCat = this.buildCat();
    this.catDoc.update(editedCat).then(r => console.log('Success'));
    this.closeDialog();
  }

  buildCat(): any {
    return  {
      name: this.newCatForm.get('name').value,
      age: this.calculateAge(this.newCatForm.get('birthdate').value),
      gender: this.newCatForm.get('gender').value,
      colors: this.newCatForm.get('colors')?.value || '',
      likes: this.newCatForm.get('likes')?.value || '',
      imgPath: this.newCatForm.get('imgPath')?.value || '../assets/images/catDefault.jpg'
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
