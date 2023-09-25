import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Filme } from 'src/models/filme';
import { FilmeService } from 'src/services/filme.service';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent {
  filmes: Filme[];
  paginaParaIniciar: number;
  query: Params

  constructor(private route: ActivatedRoute, private filmeService: FilmeService) {
    this.filmes = [];
    this.paginaParaIniciar = 1;
    this.query = [];
  }

  ngOnInit() {
    this.carregarFilmes(this.paginaParaIniciar);
  }

  mudarPagina(page: number) {
    this.carregarFilmes(page);
  }

  carregarFilmes(page: number) {
    this.route.queryParams.subscribe((queryParams) => {
      this.query = queryParams['query'];
      if (this.query) {
        this.filmeService.selecionarFilmePorQuery(this.query, page).subscribe((results) => {
          this.filmes = results;
        });
      }
    });
  }
}
