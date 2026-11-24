import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CercaDesada } from '../../models/jugador.model';
import { HistorialCerquesService } from '../../services/historial-cerques.service';
import { JugadorService } from '../../services/jugador.service';
import { termeAmbResultatsValidator } from '../../validadors/terme-amb-resultats.validator';

@Component({
  selector: 'app-filtre-jugadors',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filtre-jugadors.component.html',
  styleUrl: './filtre-jugadors.component.scss',
})
export class FiltreJugadorsComponent {
  private readonly jugadorService = inject(JugadorService);
  readonly historial = inject(HistorialCerquesService);

  @Output() filtreCanviat = new EventEmitter<{ cerca: string; posicio: string }>();

  readonly posicions = ['Porter', 'Defensa', 'Migcampista', 'Davanter'];

  readonly formulari = new FormGroup({
    cerca: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(3), Validators.maxLength(60)],
      asyncValidators: [termeAmbResultatsValidator(this.jugadorService)],
    }),
    posicio: new FormControl('', {
      nonNullable: true,
    }),
  });

  get cercaControl() {
    return this.formulari.controls.cerca;
  }

  aplicarFiltres(): void {
    if (this.formulari.invalid) {
      this.formulari.markAllAsTouched();
      return;
    }

    const valors = this.formulari.getRawValue();
    this.historial.desar(valors.cerca, valors.posicio);
    this.filtreCanviat.emit({
      cerca: valors.cerca.trim(),
      posicio: valors.posicio,
    });
  }

  reiniciarFiltres(): void {
    this.formulari.reset({ cerca: '', posicio: '' });
    this.filtreCanviat.emit({ cerca: '', posicio: '' });
  }

  recuperarCerca(cerca: CercaDesada): void {
    this.formulari.patchValue({
      cerca: cerca.terme,
      posicio: cerca.posicio,
    });
    this.aplicarFiltres();
  }
}