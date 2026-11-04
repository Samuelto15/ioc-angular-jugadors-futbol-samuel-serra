import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Jugador } from '../../models/jugador.model';

@Component({
  selector: 'app-targeta-jugador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './targeta-jugador.component.html',
  styleUrl: './targeta-jugador.component.scss'
})
export class TargetaJugadorComponent {
  @Input() jugador!: Jugador;
}