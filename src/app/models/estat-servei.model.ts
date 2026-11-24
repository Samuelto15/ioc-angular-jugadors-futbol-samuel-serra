import { Jugador } from './jugador.model';

export type FaseCarrega = 'inicial' | 'carregant' | 'carregat' | 'buit' | 'error';

export interface EstatServei<T> {
  fase: FaseCarrega;
  dades: T;
  error: string | null;
}

export type EstatJugadors = EstatServei<Jugador[]>;