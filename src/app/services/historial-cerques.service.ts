import { Injectable, signal } from '@angular/core';
import { CercaDesada } from '../models/jugador.model';

@Injectable({
  providedIn: 'root',
})
export class HistorialCerquesService {
  private readonly clauStorage = 'cataleg-jugadors-historial-cerques';
  private readonly historialSignal = signal<CercaDesada[]>(this.llegir());

  readonly historial = this.historialSignal.asReadonly();

  desar(terme: string, posicio: string): void {
    const termeNet = terme.trim();
    if (termeNet.length < 3 && !posicio) {
      return;
    }

    const novaCerca: CercaDesada = {
      terme: termeNet,
      posicio,
      data: new Date().toISOString(),
    };

    const anterior = this.historialSignal()[0];
    if (anterior && anterior.terme === novaCerca.terme && anterior.posicio === novaCerca.posicio) {
      return;
    }

    this.historialSignal.update((llista) => [novaCerca, ...llista].slice(0, 8));
    this.escriure();
  }

  netejar(): void {
    this.historialSignal.set([]);
    this.escriure();
  }

  private llegir(): CercaDesada[] {
    try {
      const dades = localStorage.getItem(this.clauStorage);
      const parsed: unknown = dades ? JSON.parse(dades) : [];
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed.filter(
        (item): item is CercaDesada =>
          typeof item?.terme === 'string' &&
          typeof item?.posicio === 'string' &&
          typeof item?.data === 'string'
      );
    } catch {
      return [];
    }
  }

  private escriure(): void {
    try {
      localStorage.setItem(this.clauStorage, JSON.stringify(this.historialSignal()));
    } catch {
      // Si localStorage falla o está bloqueado, no rompemos la app
    }
  }
}