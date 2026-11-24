# Formularis i historial de cerques

## Formulari reactiu de filtres
- **Component:** `FiltreJugadorsComponent` (`src/app/components/filtre-jugadors/filtre-jugadors.component.ts` i `.html`).
- **Camps:**
  - `cerca`: text de cerca amb validadors síncrons `Validators.minLength(3)` i `Validators.maxLength(60)`, i validador asíncron `termeAmbResultatsValidator`.
  - `posicio`: selector de posició (`Porter`, `Defensa`, `Migcampista`, `Davanter` o buit per a totes).

## Validació asíncrona i debounce
- **Fitxer:** `src/app/validadors/terme-amb-resultats.validator.ts` (`termeAmbResultatsValidator`).
- **Funcionament:** aplica `timer(400)` (400 ms de debounce) encadenat amb `switchMap` per comprovar amb el servei si el terme té resultats a l'API. Si no en té, retorna `{ senseResultats: true }`.

## Historial de cerques (`localStorage`)
- **Servei:** `HistorialCerquesService` (`src/app/services/historial-cerques.service.ts`).
- **Clau:** `cataleg-jugadors-historial-cerques`.
- **Comportament:** guarda les cerques confirmades, evita repetir duplicats consecutius, permet recuperar una cerca fent clic o netejar l'historial, i protegeix la lectura i l'escriptura de `localStorage` amb `try/catch`.