import { Component, Input } from '@angular/core';
import { Filme } from 'src/models/filme';

@Component({
  selector: 'app-card-filme',
  templateUrl: './card-filme.component.html',
  styleUrls: ['./card-filme.component.css']
})
export class CardFilmeComponent {
  @Input() filme: Filme = {
    id: 0,
    title: 'Lavar o cachorro 🦮',
    overview: 'Lavagem de cachorro',
    poster_path: '',
    backdrop_path: '',
    release_date: '',
    vote_average: 0,
    vote_count: 0,
    genre_ids: [],
    cast: []
  };
}
