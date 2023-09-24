import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LocalStorageService } from './local-storage.service';
import { Filme } from 'src/models/filme';
import { TrailerFilme } from 'src/models/trailer-filme';
import { CreditosFilme } from 'src/models/creditos-filme';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  public favoritos: Filme[];

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': environment.API_KEY
    })
  };

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    this.favoritos = this.localStorageService.carregarFavoritos();
  }

  selecionarTodosFilmesPorPopularidade(page: number): Observable<Filme[]> {
    const url = `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${page}`;
    
    return this.http.get<any>(url, this.httpOptions).pipe(
      map(response => {
        return response.results.map((filme: any) => new Filme(
          filme.id,
          filme.title,
          filme.overview,
          filme.release_date,
          filme.poster_path,
          filme.backdrop_path,
          filme.vote_average,
          filme.vote_count,
          filme.genre_ids,
          []
        ));
      })
    );
  }

  selecionarFilmePorId(id: string): Observable<Filme> {
    return this.http.get<Filme>(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, this.httpOptions)
      .pipe(
        switchMap(filme => {
          return this.selecionarCreditosPorId(filme.id as unknown as string).pipe(
            map(creditos => {
              const genres = filme.genres ? filme.genres.map((genre: any) => genre.name) : [];
              return new Filme(
                filme.id,
                filme.title,
                filme.overview,
                filme.release_date,
                filme.poster_path ? "https://image.tmdb.org/t/p/original" + filme.poster_path : '',
                filme.backdrop_path ? "https://image.tmdb.org/t/p/original" + filme.backdrop_path : '',
                filme.vote_average,
                filme.vote_count,
                filme.genre_ids,
                creditos.slice(0, 6),
                genres
              );
            })
          );
        }),
      );
  }

  selecionarTrailerPorId(id: string): Observable<TrailerFilme> {
    return this.http.get<TrailerFilme>(`https://api.themoviedb.org/3/movie/${id}/videos?language=pt-BR`, this.httpOptions)
      .pipe(
        map((trailer) => this.mapearTrailersFilme(trailer)
      )
    );
  }

  selecionarCreditosPorId(id: string): Observable<CreditosFilme[]> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}/credits?language=pt-BR`, this.httpOptions)
      .pipe(
        map(response => {
          return response.cast.map((credito: any) => new CreditosFilme(
            credito.id,
            credito.known_for_department,
            credito.name,
            credito.character,
            credito.profile_path,
            credito.order
          )   
        )
      })
    )
  }

  private mapearTrailersFilme(obj: any): TrailerFilme {
    if (Array.isArray(obj.results) && obj.results.length > 0) {
      const firstVideo = obj.results[0];
      return new TrailerFilme(firstVideo.id, firstVideo.key);
    } else {
      return new TrailerFilme(obj.id, '');
    }
  }
}