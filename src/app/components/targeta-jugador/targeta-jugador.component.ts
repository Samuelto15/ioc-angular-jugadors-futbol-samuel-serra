import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Jugador } from '../../models/jugador.model';
import { CategoriaBadgeComponent } from '../categoria-badge/categoria-badge.component';

@Component({
  selector: 'app-targeta-jugador',
  standalone: true,
  imports: [DatePipe, CategoriaBadgeComponent],
  templateUrl: './targeta-jugador.component.html',
  styleUrl: './targeta-jugador.component.scss'
})
export class TargetaJugadorComponent {
  @Input({ required: true }) jugador!: Jugador;
  @Output() seleccionar = new EventEmitter<Jugador>();

  onSeleccionar(): void {
    this.seleccionar.emit(this.jugador);
  }
}