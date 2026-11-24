import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LlistaJugadorsComponent } from './components/llista-jugadors/llista-jugadors.component';
import { FiltreJugadorsComponent } from './components/filtre-jugadors/filtre-jugadors.component';
import { Jugador } from './models/jugador.model';
import { JugadorService } from './services/jugador.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePipe, LlistaJugadorsComponent, FiltreJugadorsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly jugadorService = inject(JugadorService);

  criterisFiltre = { cerca: '', posicio: '' };
  jugadorSeleccionat?: Jugador;

  constructor() {
    this.jugadorService.carregarJugadors();
  }

  onFiltreCanviat(filtre: { cerca: string; posicio: string }): void {
    this.criterisFiltre = filtre;
    this.jugadorService.carregarJugadors(filtre.cerca);
  }

  seleccionarJugador(jugador: Jugador): void {
    this.jugadorSeleccionat = jugador;
  }

  get jugadorsFiltrats(): Jugador[] {
    const llista = this.jugadorService.jugadors();

    if (!this.criterisFiltre.posicio) {
      return llista;
    }

    return llista.filter((jugador) => jugador.posicio === this.criterisFiltre.posicio);
  }
}