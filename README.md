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
npm install sonolus-express
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
-   `options.address`: address of server (should not have ending `/`).
-   `options.basePath`: base path of server (should not have ending `/`).
-   `options.authentication`: if server has authentication.
-   `options.fallbackLocale`: fallback locale when user's preferred locale cannot be used.
-   `options.mode`: share link handling mode, can be `custom`, `redirect`, or `spa`.
-   `options.redirectPath`: path to use for redirect when `options.mode` is `redirect`.
-   `options.spaRoot`: root of static SPA files to serve when `options.mode` is `spa`.
-   `options.postsConfig`: configurations for posts.
-   `options.levelsConfig`: configurations for levels.
-   `options.skinsConfig`: configurations for skins.
-   `options.backgroundsConfig`: configurations for backgrounds.
-   `options.effectsConfig`: configurations for effects.
-   `options.particlesConfig`: configurations for particles.
-   `options.enginesConfig`: configurations for engines.
-   `options.replaysConfig`: configurations for replays.

#### `address`

As passed in from `constructor(app, options)`.

#### `authentication`

As passed in from `constructor(app, options)`.

#### `db`

Sonolus database. Can be modified to dynamically add/remove/reorder items.

-   `db.posts`: posts.
-   `db.playlists`: playlists.
-   `db.levels`: levels.
-   `db.skins`: skins.
-   `db.backgrounds`: backgrounds.
-   `db.effects`: effects.
-   `db.particles`: particles.
-   `db.engines`: engines.
-   `db.replays`: replays.

#### `router`

Express router.

Installing more routes under `options.basePath` may not work due to SPA mode catch all routes. Instead install onto `router` rather than the original Express app.

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

#### `authenticateHandler`

Handler for authentication. Defaults to `defaultAuthenticateHandler`.

Returning `AuthenticateServerResponse` causes authentication to succeed, and returning `undefined` rejects the authentication attempt.

#### `sessionHandler`

Handler for authentication session. Defaults to `defaultSessionHandler`.

Returning `true` to allow request to proceed, and returning `false` rejects the request.

#### `serverInfoHandler`

Handler for requesting server info. Defaults to `defaultServerInfoHandler`.

#### `posts`, `playlists`, `levels`, etc

Config for items.

-   `*.searches`: searches.
-   `*.infoHandler`: Handler for requesting item info. Defaults to `default*InfoHandler`.
-   `*.listHandler`: Handler for requesting item list. Defaults to `default*ListHandler`.
-   `*.detailsHandler`: Handler for requesting item details. Defaults to `default*DetailsHandler`.

### `filter*ItemsByKeywords(items, keywords)`

Filter items by keywords.

-   `items`: items.
-   `keywords`: keywords.

### `filterItemsByKeywords(items, props, keywords)`

Filter items by keywords on specified props.

Recommended to use functions for the specific item type (`filter*ItemsByKeywords`) instead.

-   `items`: items.
-   `props`: props to filter keywords on.
-   `keywords`: keywords.

### `paginateItems(items, page, perPage)`

Paginate items by page and per page size.

-   `items`: items.
-   `page`: page.
-   `perPage`: per page size, defaults to 20.

### Using `meta` in TypeScript

Use [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html):

```ts
declare module 'sonolus-core' {
    interface DatabaseLevelItem {
        meta: {
            // user-defined meta information
        }
    }
}
```
