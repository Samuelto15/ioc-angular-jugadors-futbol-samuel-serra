import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LlistaJugadorsComponent } from './components/llista-jugadors/llista-jugadors.component';
import { FiltreJugadorsComponent } from './components/filtre-jugadors/filtre-jugadors.component';
import { JUGADORS_MOCK } from './models/jugadors.mock';
import { Jugador } from './models/jugador.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePipe, LlistaJugadorsComponent, FiltreJugadorsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  jugadors: Jugador[] = JUGADORS_MOCK;
  criterisFiltre = { cerca: '', posicio: '' };
  jugadorSeleccionat?: Jugador;

  onFiltreCanviat(filtre: { cerca: string; posicio: string }): void {
    this.criterisFiltre = filtre;
  }

  seleccionarJugador(jugador: Jugador): void {
    this.jugadorSeleccionat = jugador;
  }

  get jugadorsFiltrats(): Jugador[] {
    return this.jugadors.filter(jugador => {
      const coincideixText = !this.criterisFiltre.cerca ||
        jugador.nom.toLowerCase().includes(this.criterisFiltre.cerca.toLowerCase()) ||
        jugador.descripcio.toLowerCase().includes(this.criterisFiltre.cerca.toLowerCase());

      const coincideixPosicio = !this.criterisFiltre.posicio ||
        jugador.posicio === this.criterisFiltre.posicio;

      return coincideixText && coincideixPosicio;
    });
  }
}