import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.css']
})
export class PaginacaoComponent {
  @Output() onMudarPagina = new EventEmitter<number>();
  page = 1;

  setPage(page: any) {
    this.page = page;
    this.onMudarPagina.emit(page);
  }
}
