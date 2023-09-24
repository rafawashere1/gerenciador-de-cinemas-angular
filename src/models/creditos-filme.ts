export class CreditosFilme {
  id: number;
  known_for_department: string;
  name: string;
  character: string;
  profile_path: string;
  order: number;

  constructor(
    id: number,
    known_for_department: string,
    name: string,
    character: string,
    profile_path: string,
    order: number
  ) {
    this.id = id;
    this.known_for_department = known_for_department;
    this.name = name;
    this.character = character;
    this.profile_path = "https://image.tmdb.org/t/p/original" + profile_path;
    this.order = order;
  }
}