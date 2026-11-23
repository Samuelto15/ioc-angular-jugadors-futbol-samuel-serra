# Catàleg de Jugadors de Futbol - IOC

Aplicació web desenvolupada amb Angular per buscar, filtrar i consultar la informació de jugadors de futbol.

## Versions i entorn
- **Angular CLI:** 22.2.2
- **Node.js:** 22.x (LTS)
- **TypeScript:** 5.8.x
- **Branca de treball actual:** `ra2-components`

## Components creats
- **AppComponent:** Component arrel que coordina l'estat general, el filtratge i el panell de detall.
- **LlistaJugadorsComponent:** Renderitza la col·lecció de jugadors mitjançant `@for` amb `track` i `@empty`.
- **TargetaJugadorComponent:** Mostra la fitxa resumida de cada jugador amb `@Input`, `@Output` i el pipe `date`.
- **CategoriaBadgeComponent:** Subcomponent que mostra la posició del jugador amb un distintiu de color.
- **FiltreJugadorsComponent:** Formulari reactiu per plantilla (`FormsModule`) amb validacions `required` i `minlength`.

## Accessibilitat i disseny responsive
- Enllaç de salt al contingut principal (`skip-link`).
- Contorn de focus visible (`:focus-visible`) per a navegació per teclat.
- Etiquetes `<label for="...">` associades a tots els camps i atributs ARIA (`aria-live`, `role="alert"`, `role="status"`).
- Maquetació adaptativa amb CSS Grid i `@media (max-width: 768px)`.

## Comandes del projecte

```bash
# Instal·lar dependències
npm install

# Executar el servidor de desenvolupament (http://localhost:4200)
ng serve

# Compilar el projecte per a producció
ng build

# Executar els tests unitaris
npm test