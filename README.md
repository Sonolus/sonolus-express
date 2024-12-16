# Sonolus Express

TypeScript based developer toolkit for Sonolus servers with [Express.js](https://expressjs.com).

## Links

- [Sonolus Website](https://sonolus.com)
- [Sonolus Wiki](https://wiki.sonolus.com)
- [sonolus-pack](https://github.com/Sonolus/sonolus-pack)

## Features

- Setup all necessary routes automatically, compliant with Sonolus server specifications.
- Provide handlers to interact with each route.
- Load packs created by [sonolus-pack](https://github.com/Sonolus/sonolus-pack).

## Installation

```
npm install @sonolus/express
```

## Example

```ts
const sonolus = new Sonolus()
sonolus.load('./pack')

const sonolusShare = new SonolusSpaShare('./public')

const port = 3000
const app = express()

app.use(sonolus.router)
app.use(sonolusShare.router)

app.listen(port, () => {
    console.log('Server listening at port', port)
})
```

## Documentation

### `Sonolus`

#### `constructor(options)`

Create a Sonolus server.

- `options.address`: address of server (should not have ending `/`).
- `options.fallbackLocale`: fallback locale when user's preferred locale cannot be used.
- `options.configuration`: server configuration.
- `options.upload`: upload options.
- `options[type]`: options for item group, `type` can be: `post`, `playlist`, `level`, `skin`, `background`, `effect`, `particle`, `engine`, `replay`, or `room`.
- `options[type].creates`: creates for item group.
- `options[type].searches`: searches for item group.
- `options[type].community.actions`: community actions for item group.

#### `address`

As passed in from `constructor(options)`.

#### `fallbackLocale`

As passed in from `constructor(options)`.

#### `router`

Configured Express.js router.

#### `title`

Server title.

#### `description`

Server description.

#### `banner`

Server banner.

#### `sessionHandler`

Handler for authentication session.

#### `authenticateHandler`

Handler for authentication.

#### `serverInfoHandler`

Handler for requesting server info.

#### `multiplayer.createHandler`

Handler for creating multiplayer room.

#### `multiplayer.joinHandler`

Handler for joining multiplayer room.

#### `[type]`

Item group.

`type` can be: `post`, `playlist`, `level`, `skin`, `background`, `effect`, `particle`, `engine`, `replay`, or `room`.

#### `[type].items`

Items.

Can be dynamically modified.

#### `[type].creates`

Creates.

#### `[type].searches`

Searches.

#### `[type].infoHandler`

Handler for requesting item info.

#### `[type].listHandler`

Handler for requesting item list.

#### `[type].createHandler`

Handler for creating item.

#### `[type].preUploadHandler`

Pre handler for uploading item.

#### `[type].uploadHandler`

Handler for uploading item.

#### `[type].detailsHandler`

Handler for requesting item details.

#### `[type].submitActionHandler`

Handler for submitting item action.

#### `[type].preUploadActionHandler`

Pre handler for uploading item action.

#### `[type].uploadActionHandler`

Handler for uploading item action.

#### `[type].community.actions`

Community actions.

#### `[type].community.infoHandler`

Handler for requesting item community info.

#### `[type].community.submitHandler`

Handler for submitting item community action.

#### `[type].community.preUploadHandler`

Pre handler for uploading item community action.

#### `[type].community.uploadHandler`

Handler for uploading item community action.

#### `[type].community.comment.actions`

Community comment actions.

#### `[type].community.comment.listHandler`

Handler for requesting item community comment list.

#### `[type].community.comment.submitHandler`

Handler for submitting item community comment action.

#### `[type].community.comment.preUploadHandler`

Pre handler for uploading item community comment action.

#### `[type].community.comment.uploadHandler`

Handler for uploading item community comment action.

#### `[type].leaderboard.detailsHandler`

Handler for requesting item community details.

#### `[type].leaderboard.record.listHandler`

Handler for requesting item community record list.

#### `[type].leaderboard.record.detailsHandler`

Handler for requesting item community record details.

#### `load(path)`

Load a pack created by [sonolus-pack](https://github.com/NonSpicyBurrito/sonolus-pack).

- `path`: file path to the pack.

#### `add(type, data, hash?)`

Add a resource. Returns `Srl` which can be used to access the resource.

- `type`: resource type.
- `data`: data (`Buffer`) or file path (`string`) to the data.
- `hash`: (optional) hash of the resource, will be calculated automatically when omitted.

#### `localize(text, locale)`

Localize text using target and fallback locales.

- `text`: text to localize.
- `locale`: target locale.

### `SonolusSpaShare`

#### `constructor(root)`

Create a Sonolus SPA share server.

- `root`: root of static SPA files.

#### `router`

Configured Express.js router.

### `SonolusRedirectShare`

#### `constructor(root)`

Create a Sonolus redirect share server.

- `root`: root of redirect.

#### `router`

Configured Express.js router.

### `filter*(items, keywords)`

Filter items by keywords.

- `items`: items.
- `keywords`: keywords.

### `paginateItems(items, page, perPage?)`

Paginate items by page and per page size.

- `items`: items.
- `page`: page.
- `perPage`: per page size, defaults to 20.

### Using `meta` in TypeScript

Use [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html):

```ts
declare module '@sonolus/express' {
    interface LevelItemModel {
        meta: {
            // user-defined meta information
        }
    }
}
```
