import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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


  constructor(private filmeService: FilmeService, private localStorageService: LocalStorageService, private toastrService: ToastrService) {
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

      this.atualizarCast();
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
        this.toastrService.success('Filme removido dos favoritos.', 'Sucesso')
      } else {
        this.localStorageService.favoritar(this.filme);
        this.toastrService.success('Filme adicionado aos favoritos.', 'Sucesso')
      }
    }
  }

  filmeEstaNosFavoritos(): boolean {
    return this.localStorageService.selecionarPorId(this.filme.id) !== undefined;
  }

  criarLinkWikipedia(nomeCompleto: string): string {
    return `https://pt.wikipedia.org/wiki/${nomeCompleto.split(' ').join('_')}`;
  }

  atualizarCast(): void {
    this.filme.linkWikipedia = this.filme.cast.map((ator: CreditosFilme) =>
      this.criarLinkWikipedia(ator.name)
    );
  }
}
