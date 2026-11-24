import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of, switchMap, timer } from 'rxjs';
import { JugadorService } from '../services/jugador.service';

export function termeAmbResultatsValidator(jugadorService: JugadorService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const terme = (control.value ?? '').toString().trim();

    if (terme.length < 3) {
      return of(null);
    }

    return timer(400).pipe(
      switchMap(() => jugadorService.comprovarResultatsCerca(terme)),
      map((total) => (total > 0 ? null : { senseResultats: true })),
      catchError(() => of(null))
    );
  };
}