import { Component, OnInit } from '@angular/core';
import { CreditosFilme } from 'src/models/creditos-filme';
import { Filme } from 'src/models/filme';
import { TrailerFilme } from 'src/models/trailer-filme';
import { FilmeService } from 'src/services/filme.service';
import { LocalStorageService } from 'src/services/local-storage.service';

@Component({
  selector: 'app-detalhes-filme',
  templateUrl: './detalhes-filme.component.html',
  styleUrls: ['./detalhes-filme.component.css']
})
export class DetalhesFilmeComponent implements OnInit {
  idFilme: string;
  filme: Filme;
  trailer: TrailerFilme;
  credito: CreditosFilme[];


  constructor(private filmeService: FilmeService, private localStorageService: LocalStorageService) {
    this.idFilme = '';
    this.filme = new Filme(0, '', '', '', '', '', 0, 0, [], []);
    this.trailer = new TrailerFilme(0, '');
    this.credito = [];
  }
  ngOnInit(): void {
    const urlAtual = new URL(window.location.href);
    this.idFilme = urlAtual.searchParams.get("id") as string;

    this.filmeService.selecionarFilmePorId(this.idFilme).subscribe((filme) => {
      this.filme = filme;
    })

    this.filmeService.selecionarTrailerPorId(this.idFilme).subscribe((trailer) => {
      this.trailer = trailer;
    })

    this.filmeService.selecionarCreditosPorId(this.idFilme).subscribe((credito) => {
      this.credito = credito;
    })
  }

  atualizarFavoritos() {
    if (this.filme) {
      const filmeNoLocalStorage = this.localStorageService.selecionarPorId(this.filme.id);
  
      if (filmeNoLocalStorage) {
        this.localStorageService.desfavoritar(this.filme.id);
      } else {
        this.localStorageService.favoritar(this.filme);
      }
    }
  }

  filmeEstaNosFavoritos(): boolean {
    return this.localStorageService.selecionarPorId(this.filme.id) !== undefined;
  }
}
