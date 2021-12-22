import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { CatsListComponent } from './cats-list/cats-list-component/cats-list.component';
import {CatsListPage} from "./cats-list/cats-list.page/cats-list.page";
import { HeaderComponent } from './header/header.component';
import { CatDetailComponent } from './cat-detail/cat-detail.component/cat-detail.component';
import { CatDetailPage } from './cat-detail/cat-detail.page/cat-detail.page';
import { HomeComponent } from './home/home.component';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireModule } from "@angular/fire/compat";
import { CatsService } from "./cats.service";
import { AddCatDialogComponent } from './add-cat-dialog/add-cat-dialog.component';
import { MaterialModule } from "./material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DeleteCatDialogComponent} from "./delete-cat-dialog/delete-cat-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    CatsListComponent,
    CatsListPage,
    HeaderComponent,
    CatDetailComponent,
    CatDetailPage,
    HomeComponent,
    AddCatDialogComponent,
    DeleteCatDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),

  ],
  providers: [AngularFirestore,CatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
