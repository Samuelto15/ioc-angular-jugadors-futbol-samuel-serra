## Taula de mapatge API -> Model intern (`Jugador`)

| Camp API (`JugadorApiResponse`) | Tipus API | Camp intern (`Jugador`) | Tipus intern | Transformació / Normalització aplicada |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `string` | `id` | `string` | Conversió segura amb `String(raw.id)`. |
| `nom` | `string \| undefined` | `nom` | `string` | Eliminació d'espais (`trim()`) i valor per defecte `'Jugador sense nom'`. |
| `descripcio` | `string \| undefined` | `descripcio` | `string` | Eliminació d'espais (`trim()`) i text per defecte si ve buit. |
| `posicio` | `string \| undefined` | `posicio` | `PosicioJugador` | Validació contra les 4 posicions vàlides; si no coincideix, assigna `'Migcampista'`. |
| `dataDebut` | `string \| undefined` | `dataDebut` | `Date` | Conversió de cadena ISO (`"YYYY-MM-DD"`) a objecte `Date` vàlid. |
| `dorsal` | `number \| string` | `dorsal` | `number` | Conversió numèrica amb `Number()`, truncat a enter positiu (`0` si és invàlid). |
| `esDestacat` | `boolean \| undefined` | `esDestacat` | `boolean` | Conversió explícita a booleà amb `Boolean(raw.esDestacat)`. |