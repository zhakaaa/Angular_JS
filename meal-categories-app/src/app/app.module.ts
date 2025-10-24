import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [],

  imports: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FormsModule,
  ],
  providers: [],
  bootstrap: []
})

export class AppModule {}
