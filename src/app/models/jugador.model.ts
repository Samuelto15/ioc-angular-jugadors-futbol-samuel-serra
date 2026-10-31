export interface Jugador {
  id: number;
  nom: string;
  descripcio: string;
  posicio: 'Porter' | 'Defensa' | 'Migcampista' | 'Davanter';
  dataDebut: Date;
  dorsal: number;
  esDestacat: boolean;
}