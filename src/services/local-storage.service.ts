import { Injectable } from '@angular/core';
import { Filme } from 'src/models/filme';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly localStorage: Storage;
  private readonly chave: string = 'apmbd_favoritos@2.0.0';

  private favoritos: Filme[];

  constructor() { 
    this.localStorage = window.localStorage;

    this.favoritos = this.carregarFavoritos();
  }

  public favoritar(filme: Filme): void {
    if (this.favoritos.find((f): boolean => f.id == filme.id)) return;

    this.favoritos.push(filme);
    this.salvar();
  }

  public desfavoritar(id: number): void {
    this.favoritos = this.favoritos.filter((f): boolean => f.id != id);
    this.salvar();
  }

  public carregarFavoritos(): Filme[] {
    const dados = this.localStorage.getItem(this.chave);

    if (!dados) return [];

    const objetos = JSON.parse(dados);

    const filmes = new Array<Filme>();

    for (const objeto of objetos) {
      filmes.push(new Filme(objeto.id, objeto.title, objeto.overview, objeto.release_date, objeto.poster_path, objeto.backdrop_path, objeto.vote_average, objeto.vote_count, objeto.genre_ids, objeto.cast));
    }

    return filmes
  }

  public selecionarPorId(id: number): Filme | undefined {
    return this.favoritos.find((f): boolean => f.id == id)
  }

  salvar(): void {
    const jsonString = JSON.stringify(this.favoritos);

    localStorage.setItem(this.chave, jsonString);
  }
}
