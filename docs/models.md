# Models i adaptador de dades

## Fitxers del mòdul
- **Model API:** `src/app/models/jugador-api.model.ts` (`JugadorApiResponse` i `NouJugadorPayload`)
- **Model intern:** `src/app/models/jugador.model.ts` (`Jugador` i `PosicioJugador`)
- **Adaptador:** `src/app/models/jugador.adapter.ts` (`adaptarJugadorApi`, `adaptarJugadorsApi` i `prepararJugadorApi`)

## Taula de mapatge API -> Model intern (`Jugador`)

| Camp API | Tipus API | Camp intern | Tipus intern | Normalització aplicada |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `string` | `id` | `string` | Conversió a text amb `String(raw.id)`. |
| `nom` | `string \| undefined` | `nom` | `string` | `.trim()` i valor per defecte `'Jugador sense nom'` si ve buit. |
| `descripcio` | `string \| undefined` | `descripcio` | `string` | `.trim()` i valor per defecte `'Sense descripció disponible.'` si ve buit. |
| `posicio` | `string \| undefined` | `posicio` | `PosicioJugador` | Comprova si és una posició vàlida; si no, posa `'Migcampista'`. |
| `dataDebut` | `string \| undefined` | `dataDebut` | `Date` | Converteix la data a `Date` (i posa data actual si no és vàlida). |
| `dorsal` | `number \| string` | `dorsal` | `number` | Converteix a enter positiu (`0` si no és vàlid). |
| `esDestacat` | `boolean \| undefined` | `esDestacat` | `boolean` | Converteix a booleà amb `Boolean()`. |