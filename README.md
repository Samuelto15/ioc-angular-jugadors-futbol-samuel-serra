# Catàleg de Jugadors de futbol

Aplicació web feta amb Angular per consultar, filtrar i buscar jugadors connectada a una API local amb `json-server`.

## Entorn i branca
- **Angular CLI:** 22.2.2
- **Branca de treball:** `ra3-serveis`
- **API local:** `http://localhost:4301/jugadors` (`npm run api`)

## Què s'ha treballat en aquesta fase
- **Models i adaptador:** `JugadorApiResponse`, `NouJugadorPayload`, `Jugador` i `adaptarJugadorApi` / `adaptarJugadorsApi` / `prepararJugadorApi`.
- **Serveis:** `JugadorService` (amb `HttpClient`, `signal`, `switchMap`, gestió d'errors, `reintentar()` i `POST`) i `HistorialCerquesService` (amb `localStorage`).
- **Formulari reactiu:** `FiltreJugadorsComponent` amb `ReactiveFormsModule`, validació síncrona, validació asíncrona amb `debounce` (`timer(400)`) i historial de cerques.

## Comandes del projecte

```bash
npm install
npm run api
ng serve
npm test
npm run build
