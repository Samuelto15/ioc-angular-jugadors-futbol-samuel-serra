import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Jugador } from '../../models/jugador.model';
import { TargetaJugadorComponent } from '../targeta-jugador/targeta-jugador.component';

@Component({
  selector: 'app-llista-jugadors',
  standalone: true,
  imports: [TargetaJugadorComponent],
  templateUrl: './llista-jugadors.component.html',
  styleUrl: './llista-jugadors.component.scss'
})
export class LlistaJugadorsComponent {
  @Input({ required: true }) jugadors: Jugador[] = [];
  @Output() seleccionar = new EventEmitter<Jugador>();
}
