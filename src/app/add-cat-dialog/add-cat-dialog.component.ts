import {Component, Inject, OnInit} from '@angular/core';
import {Cat} from "../cat.model";
import {
  FormControl,
  FormGroupDirective,
  FormGroup,
  NgForm,
  Validators,
  AbstractControl,
  ValidatorFn
} from '@angular/forms';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from "@angular/router";
import {CatsStoreService} from "../cats.store.service";

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
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: {cat: Cat, editMode: boolean},
              private catsStoreService: CatsStoreService,
              public dialogRef: MatDialogRef<AddCatDialogComponent>) { }

  ngOnInit(): void {
    let birthDate;
    if(this.data.cat) {
      birthDate = this.data.cat.birthDate ? new Date(this.data.cat.birthDate.seconds * 1000) : null;
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
      imgPath: new FormControl(this.data?.cat?.imgPath || '', [this.patternValidator()])
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

  addNewCat() {
    const newCat = this.buildCat();
    this.firestore.collection('cats').add(newCat).then(r => console.log('Success'));

    this.closeDialog();
    this.gotoCats();
  }

  updateCat(): void {
    const editedCat = this.buildCat();
    this.catDoc.update(editedCat).then(r => console.log('Success'));
    this.catsStoreService.addCat(editedCat);
    this.closeDialog();
    this.gotoCats();
  }

  buildCat(): any {
    return  {
      name: this.newCatForm.get('name').value,
      age: this.calculateAge(this.newCatForm.get('birthdate').value),
      birthDate: this.newCatForm.get('birthdate').value,
      gender: this.newCatForm.get('gender').value,
      colors: this.newCatForm.get('colors')?.value || '',
      likes: this.newCatForm.get('likes')?.value || '',
      imgPath: this.newCatForm.get('imgPath')?.value || '../assets/images/catDefault.jpg'
    }
  }

  gotoCats(): void {
    this.router.navigate(['/cats']).then(r => {});
  }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('(https:\\/\\/)([^\\s(["<,>/]*)(\\/)[^\\s[",><]*(.png|.jpg)(\\?[^\\s[",><]*)?');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
