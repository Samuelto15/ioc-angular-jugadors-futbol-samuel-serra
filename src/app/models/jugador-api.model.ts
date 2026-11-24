export interface JugadorApiResponse {
  id: string;
  nom?: string;
  descripcio?: string;
  posicio?: string;
  dataDebut?: string;
  dorsal?: number | string;
  esDestacat?: boolean;
}

export interface NouJugadorPayload {
  nom: string;
  descripcio: string;
  posicio: string;
  dataDebut: string;
  dorsal: number;
  esDestacat: boolean;
}