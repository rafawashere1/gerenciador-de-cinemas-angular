import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-busca',
  templateUrl: './barra-busca.component.html',
  styleUrls: ['./barra-busca.component.css']
})
export class BarraBuscaComponent {
  searchTerm: string = '';

  constructor(private router: Router) {

  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.router.navigate(['/filmes/busca'], {
        queryParams: { query: this.searchTerm },
      });
    }
  }
}
