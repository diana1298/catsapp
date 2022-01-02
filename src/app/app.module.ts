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
import { AgmCoreModule } from '@agm/core';
import { CatsListComponent } from './cats-list/cats-list-component/cats-list.component';
import { CatsListPage } from "./cats-list/cats-list.page/cats-list.page";
import { HeaderComponent } from './header/component/header.component';
import { HeaderPage } from "./header/page/header.page";
import { CatDetailComponent } from './cat-detail/cat-detail.component/cat-detail.component';
import { CatDetailPage } from './cat-detail/cat-detail.page/cat-detail.page';
import { HomeComponent } from './home/home.component';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireModule } from "@angular/fire/compat";
import { CatsService } from "./cats.service";
import { AddCatDialogComponent } from './add-cat-dialog/add-cat-dialog.component';
import { MaterialModule } from "./material.module";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DeleteCatDialogComponent} from "./delete-cat-dialog/delete-cat-dialog.component";
import { CatLocationComponent } from './cat-location/cats-location.component/cat-location.component';
import { CatLocationPage} from "./cat-location/cats-location.page/cat-location.page";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./app.reducers";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    CatsListComponent,
    CatsListPage,
    HeaderComponent,
    HeaderPage,
    CatDetailComponent,
    CatDetailPage,
    HomeComponent,
    AddCatDialogComponent,
    DeleteCatDialogComponent,
    CatLocationComponent,
    CatLocationPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    // !environment.production ? StoreDevtoolsModule.instrument() : [],
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC6uuu9_wvrn3DpMy-Yt2P1ZY9OM9vF-qM'
    })
  ],
  providers: [AngularFirestore,CatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
