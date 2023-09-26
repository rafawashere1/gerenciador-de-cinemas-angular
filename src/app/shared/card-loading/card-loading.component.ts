import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-loading',
  templateUrl: './card-loading.component.html',
  styleUrls: ['./card-loading.component.css'],
})
export class CardLoadingComponent {
  @Input() tamanho = 350;
}
