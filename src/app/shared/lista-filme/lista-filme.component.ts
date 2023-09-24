import { Component, Input, OnInit } from '@angular/core';
import { Filme } from 'src/models/filme';
import { FilmeService } from 'src/services/filme.service';
import { LocalStorageService } from 'src/services/local-storage.service';

@Component({
  selector: 'app-lista-filme',
  templateUrl: './lista-filme.component.html',
  styleUrls: ['./lista-filme.component.css']
})
export class ListaFilmeComponent implements OnInit {
  @Input() tipoLista: string = 'favoritos';
  @Input() mostrarPaginacao: boolean = true;
  filmes: Filme[] = [];
  paginaParaIniciar: number;

  constructor(private service: FilmeService, private localStorageService: LocalStorageService) {
    this.paginaParaIniciar = 1;
  }

  ngOnInit() {
    this.carregarFilmes(this.paginaParaIniciar);
  }

  mudarPagina(page: number) {
    this.carregarFilmes(page);
  }

  private carregarFilmes(page: number) {
    if (this.tipoLista === 'favoritos') {
      this.filmes = this.localStorageService.carregarFavoritos();
    } else if (this.tipoLista === 'populares') {
      this.service.selecionarTodosFilmesPorPopularidade(page).subscribe((filmes) => {
        this.filmes = filmes;
      });
    } else {
      this.filmes = [];
    }
  }
}