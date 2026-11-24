export type PosicioJugador = 'Porter' | 'Defensa' | 'Migcampista' | 'Davanter';

export interface Jugador {
  id: string;
  nom: string;
  descripcio: string;
  posicio: PosicioJugador;
  dataDebut: Date;
  dorsal: number;
  esDestacat: boolean;
}

export interface CercaDesada {
  terme: string;
  posicio: string;
  data: string;
}