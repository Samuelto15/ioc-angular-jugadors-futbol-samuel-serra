import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Subject, catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { EstatJugadors } from '../models/estat-servei.model';
import { JugadorApiResponse } from '../models/jugador-api.model';
import {
  adaptarJugadorApi,
  adaptarJugadorsApi,
  prepararJugadorApi,
} from '../models/jugador.adapter';
import { Jugador } from '../models/jugador.model';

@Injectable({
  providedIn: 'root',
})
export class JugadorService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/jugadors`;

  private readonly consulta$ = new Subject<string>();
  private ultimaConsulta = '';

  private readonly estatSignal = signal<EstatJugadors>({
    fase: 'inicial',
    dades: [],
    error: null,
  });

  readonly estat = this.estatSignal.asReadonly();
  readonly jugadors = computed(() => this.estatSignal().dades);
  readonly carregant = computed(() => this.estatSignal().fase === 'carregant');
  readonly error = computed(() => this.estatSignal().error);

  constructor() {
    this.consulta$
      .pipe(
        tap((terme) => {
          this.ultimaConsulta = terme;
          this.estatSignal.update((estatActual) => ({
            ...estatActual,
            fase: 'carregant',
            error: null,
          }));
        }),
        switchMap((terme) =>
          this.http.get<JugadorApiResponse[]>(this.apiUrl).pipe(
            map((resposta) => {
              const adaptats = adaptarJugadorsApi(resposta);
              const net = terme.trim().toLowerCase();

              if (!net) {
                return adaptats;
              }

              return adaptats.filter(
                (j) =>
                  j.nom.toLowerCase().includes(net) ||
                  j.posicio.toLowerCase().includes(net) ||
                  j.descripcio.toLowerCase().includes(net)
              );
            }),
            catchError(() => {
              this.estatSignal.set({
                fase: 'error',
                dades: [],
                error:
                  "No s'han pogut carregar els jugadors des de l'API. Revisa que json-server estigui en marxa.",
              });
              return of([] as Jugador[]);
            })
          )
        )
      )
      .subscribe((llista) => {
        if (this.estatSignal().fase === 'error') {
          return;
        }

        this.estatSignal.set({
          fase: llista.length > 0 ? 'carregat' : 'buit',
          dades: llista,
          error: null,
        });
      });
  }

  carregarJugadors(terme = ''): void {
    this.consulta$.next(terme);
  }

  reintentar(): void {
    this.consulta$.next(this.ultimaConsulta);
  }

  crearJugador(nouJugador: Omit<Jugador, 'id'>) {
    const payload = prepararJugadorApi(nouJugador);

    return this.http.post<JugadorApiResponse>(this.apiUrl, payload).pipe(
      map((resposta) => adaptarJugadorApi(resposta)),
      tap((jugadorCreat) => {
        this.estatSignal.update((estatActual) => ({
          fase: 'carregat',
          dades: [...estatActual.dades, jugadorCreat],
          error: null,
        }));
      })
    );
  }
  comprovarResultatsCerca(terme: string) {
    const net = terme.trim().toLowerCase();
    return this.http.get<JugadorApiResponse[]>(this.apiUrl).pipe(
      map((resposta) => {
        const adaptats = adaptarJugadorsApi(resposta);
        if (!net) {
          return adaptats.length;
        }
        return adaptats.filter(
          (j) =>
            j.nom.toLowerCase().includes(net) ||
            j.posicio.toLowerCase().includes(net) ||
            j.descripcio.toLowerCase().includes(net)
        ).length;
      })
    );
  }
}