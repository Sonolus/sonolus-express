# sonolus-express

TypeScript based developer toolkit for Sonolus servers with [Express.js](https://expressjs.com).

## Links

-   [Sonolus Website](https://sonolus.com)
-   [Sonolus Wiki](https://wiki.sonolus.com)
-   [sonolus-pack](https://github.com/Sonolus/sonolus-pack)

## Features

-   Setup all necessary routes automatically, compliant with Sonolus server specifications.
-   Provide handlers to interact with each route.
-   Load packs created by [sonolus-pack](https://github.com/Sonolus/sonolus-pack).

## Installation

```
npm install sonolus.js
```

A compatible version of [sonolus-core](https://github.com/Sonolus/sonolus-core) is also required as peer dependency. If it isn't installed automatically, you can do so with:

```
npm install sonolus-core
```

## Example

```ts
const port = 3000
const app = express()

new Sonolus(app).load('pack')

app.listen(port, () => {
    console.log('Server listening at port', port)
})
```

## Documentation

### `Sonolus`

#### `constructor(app, options)`

Create a Sonolus server on `app` with `options`.

-   `app`: [Express.js](https://expressjs.com) app.
-   `options.version`: allowed Sonolus version.
-   `options.basePath`: base path of the Sonolus server.
-   `options.fallbackLocale`: fallback locale when user's preferred locale cannot be used.

#### `db`

Sonolus database. Can be modified to dynamically add/remove/reorder items.

-   `db.levels`: levels.
-   `db.skins`: skins.
-   `db.backgrounds`: backgrounds.
-   `db.effects`: effects.
-   `db.particles`: particles.
-   `db.engines`: engines.

#### `load(path)`

Load a pack created by [sonolus-pack](https://github.com/NonSpicyBurrito/sonolus-pack).

-   `path`: file path to the pack.

#### `add(type, data, hash?)`

Add a resource. Returns `SRL` which can be used to access the resource.

-   `type`: resource type.
-   `data`: data (`Buffer`) or file path (`string`) to the data.
-   `hash`: (optional) hash of the resource, will be calculated automatically when omitted.

#### `localize(text, locale)`

Localize text using target and fallback locales.

-   `text`: text to localize.
-   `locale`: target locale.

#### `serverInfoHandler`

Handler for requesting server info. Defaults to `defaultServerInfoHandler`.

#### `levelListHandler`

Handler for requesting level list. Defaults to `defaultLevelListHandler`.

#### `skinListHandler`

Handler for requesting skin list. Defaults to `defaultSkinListHandler`.

#### `backgroundListHandler`

Handler for requesting background list. Defaults to `defaultBackgroundListHandler`.

#### `effectListHandler`

Handler for requesting effect list. Defaults to `defaultEffectListHandler`.

#### `particleListHandler`

Handler for requesting particle list. Defaults to `defaultParticleListHandler`.

#### `engineListHandler`

Handler for requesting engine list. Defaults to `defaultEngineListHandler`.

#### `levelDetailsHandler`

Handler for requesting level details. Defaults to `defaultLevelDetailsHandler`.

#### `skinDetailsHandler`

Handler for requesting skin details. Defaults to `defaultSkinDetailsHandler`.

#### `backgroundDetailsHandler`

Handler for requesting background details. Defaults to `defaultBackgroundDetailsHandler`.

#### `effectDetailsHandler`

Handler for requesting effect details. Defaults to `defaultEffectDetailsHandler`.

#### `particleDetailsHandler`

Handler for requesting particle details. Defaults to `defaultParticleDetailsHandler`.

#### `engineDetailsHandler`

Handler for requesting engine details. Defaults to `defaultEngineDetailsHandler`.

### Using `meta` in TypeScript

Use [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html):

```ts
declare module 'sonolus-core' {
    interface LevelInfo {
        meta: ... // user-defined meta information type
    }
}
```
