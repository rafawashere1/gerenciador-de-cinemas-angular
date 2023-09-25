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
import { ToastrModule } from 'ngx-toastr';
import { BarraBuscaComponent } from './shared/barra-busca/barra-busca.component';
import { FormsModule } from '@angular/forms';
import { BuscaComponent } from './pages/busca/busca.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CardFilmeComponent,
    DetalhesFilmeComponent,
    ListaFilmeComponent,
    SafePipe,
    PaginacaoComponent,
    BarraBuscaComponent,
    BuscaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbNavModule,
    NgbPaginationModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
