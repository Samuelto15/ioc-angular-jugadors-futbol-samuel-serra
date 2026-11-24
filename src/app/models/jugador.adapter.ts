import { Jugador, PosicioJugador } from './jugador.model';
import { JugadorApiResponse, NouJugadorPayload } from './jugador-api.model';

const POSICIONS_VALIDES: PosicioJugador[] = [
  'Porter',
  'Defensa',
  'Migcampista',
  'Davanter',
];

function normalitzarPosicio(posicio?: string): PosicioJugador {
  const neta = posicio?.trim() as PosicioJugador;
  return POSICIONS_VALIDES.includes(neta) ? neta : 'Migcampista';
}

function normalitzarData(dataRaw?: string): Date {
  if (!dataRaw) {
    return new Date();
  }
  const data = new Date(dataRaw);
  return Number.isNaN(data.getTime()) ? new Date() : data;
}

export function adaptarJugadorApi(raw: JugadorApiResponse): Jugador {
  const dorsalNum = Number(raw.dorsal);

  return {
    id: String(raw.id),
    nom: raw.nom?.trim() || 'Jugador sense nom',
    descripcio: raw.descripcio?.trim() || 'Sense descripció disponible.',
    posicio: normalitzarPosicio(raw.posicio),
    dataDebut: normalitzarData(raw.dataDebut),
    dorsal: Number.isFinite(dorsalNum) && dorsalNum > 0 ? Math.trunc(dorsalNum) : 0,
    esDestacat: Boolean(raw.esDestacat),
  };
}

export function adaptarJugadorsApi(llistaRaw: JugadorApiResponse[]): Jugador[] {
  return Array.isArray(llistaRaw) ? llistaRaw.map(adaptarJugadorApi) : [];
}

export function prepararJugadorApi(jugador: Omit<Jugador, 'id'>): NouJugadorPayload {
  const data = jugador.dataDebut instanceof Date
    ? jugador.dataDebut
    : new Date(jugador.dataDebut);
  const dataValida = Number.isNaN(data.getTime()) ? new Date() : data;

  return {
    nom: jugador.nom.trim(),
    descripcio: jugador.descripcio.trim(),
    posicio: jugador.posicio,
    dataDebut: dataValida.toISOString().split('T')[0],
    dorsal: Number(jugador.dorsal),
    esDestacat: Boolean(jugador.esDestacat),
  };
}