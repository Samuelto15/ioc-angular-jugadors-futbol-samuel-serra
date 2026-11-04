import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtre-jugadors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtre-jugadors.component.html',
  styleUrl: './filtre-jugadors.component.scss'
})
export class FiltreJugadorsComponent {
  @Output() filtreCanviat = new EventEmitter<{ cerca: string; posicio: string }>();

  textCerca: string = '';
  posicioSeleccionada: string = '';

  aplicarFiltres(): void {
    this.filtreCanviat.emit({
      cerca: this.textCerca,
      posicio: this.posicioSeleccionada
    });
  }

  reiniciarFiltres(): void {
    this.textCerca = '';
    this.posicioSeleccionada = '';
    this.aplicarFiltres();
  }
}