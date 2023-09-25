export class TrailerFilme {
  id: number;
  backdrop_path: string;

  constructor(id: number, backdrop_path: string) {
    this.id = id;
    this.backdrop_path = `https://www.youtube-nocookie.com/embed/${backdrop_path}`;
  }
}