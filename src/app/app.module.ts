import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NgbModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { CardFilmeComponent } from './shared/card-filme/card-filme.component';
import { DetalhesFilmeComponent } from './pages/detalhes-filme/detalhes-filme.component';
import { ListaFilmeComponent } from './shared/lista-filme/lista-filme.component';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from 'src/services/local-storage.service';
import { SafePipe } from './pipes/SafePipe.pipe';
import { PaginacaoComponent } from './shared/paginacao/paginacao.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CardFilmeComponent,
    DetalhesFilmeComponent,
    ListaFilmeComponent,
    SafePipe,
    PaginacaoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbNavModule,
    NgbPaginationModule
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
