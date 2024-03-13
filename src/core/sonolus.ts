import { webcrypto } from 'crypto'
import type { Express, Request, Response, Router } from 'express'
import * as express from 'express'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import type { ParsedQs } from 'qs'
import {
    Database,
    DatabaseBackgroundItem,
    DatabaseEffectItem,
    DatabaseEngineItem,
    DatabaseLevelItem,
    DatabaseParticleItem,
    DatabasePlaylistItem,
    DatabasePostItem,
    DatabaseReplayItem,
    DatabaseSkinItem,
    LocalizationText,
    SRL,
    getSignaturePublicKey,
    localize,
    hash as sonolusHash,
    version,
} from 'sonolus-core'
import { ParsedQuery } from '../api/search/query'
import { SearchesModel } from '../api/search/search'
import { authenticateServerRequestSchema } from '../schemas/authenticate-server-request'
import { databaseParser } from '../schemas/database'
import {
    AuthenticateHandler,
    SessionHandler,
    defaultAuthenticateHandler,
    defaultSessionHandler,
} from './authentication'
import {
    backgroundDetailsRouteHandler,
    defaultBackgroundDetailsHandler,
} from './routes/backgrounds/details'
import { backgroundInfoRouteHandler, defaultBackgroundInfoHandler } from './routes/backgrounds/info'
import { backgroundListRouteHandler, defaultBackgroundListHandler } from './routes/backgrounds/list'
import { defaultEffectDetailsHandler, effectDetailsRouteHandler } from './routes/effects/details'
import { defaultEffectInfoHandler, effectInfoRouteHandler } from './routes/effects/info'
import { defaultEffectListHandler, effectListRouteHandler } from './routes/effects/list'
import { defaultEngineDetailsHandler, engineDetailsRouteHandler } from './routes/engines/details'
import { defaultEngineInfoHandler, engineInfoRouteHandler } from './routes/engines/info'
import { defaultEngineListHandler, engineListRouteHandler } from './routes/engines/list'
import { ItemDetailsHandler } from './routes/item-details'
import { ItemInfoHandler } from './routes/item-info'
import { ItemListHandler } from './routes/item-list'
import { defaultLevelDetailsHandler, levelDetailsRouteHandler } from './routes/levels/details'
import { defaultLevelInfoHandler, levelInfoRouteHandler } from './routes/levels/info'
import { defaultLevelListHandler, levelListRouteHandler } from './routes/levels/list'
import {
    defaultParticleDetailsHandler,
    particleDetailsRouteHandler,
} from './routes/particles/details'
import { defaultParticleInfoHandler, particleInfoRouteHandler } from './routes/particles/info'
import { defaultParticleListHandler, particleListRouteHandler } from './routes/particles/list'
import {
    defaultPlaylistDetailsHandler,
    playlistDetailsRouteHandler,
} from './routes/playlists/details'
import { defaultPlaylistInfoHandler, playlistInfoRouteHandler } from './routes/playlists/info'
import { defaultPlaylistListHandler, playlistListRouteHandler } from './routes/playlists/list'
import { defaultPostDetailsHandler, postDetailsRouteHandler } from './routes/posts/details'
import { defaultPostInfoHandler, postInfoRouteHandler } from './routes/posts/info'
import { defaultPostListHandler, postListRouteHandler } from './routes/posts/list'
import { defaultReplayDetailsHandler, replayDetailsRouteHandler } from './routes/replays/details'
import { defaultReplayInfoHandler, replayInfoRouteHandler } from './routes/replays/info'
import { defaultReplayListHandler, replayListRouteHandler } from './routes/replays/list'
import {
    ServerInfoHandler,
    defaultServerInfoHandler,
    serverInfoRouteHandler,
} from './routes/server-info'
import { defaultSkinDetailsHandler, skinDetailsRouteHandler } from './routes/skins/details'
import { defaultSkinInfoHandler, skinInfoRouteHandler } from './routes/skins/info'
import { defaultSkinListHandler, skinListRouteHandler } from './routes/skins/list'

export type ItemsConfig = {
    searches: SearchesModel
}

export type SonolusBase = {
    address?: string
    db: Database
}

export type SonolusCallback<A extends unknown[], R> = <
    TPosts extends ItemsConfig,
    TPlaylists extends ItemsConfig,
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
    TReplays extends ItemsConfig,
>(
    sonolus: Sonolus<
        TPosts,
        TPlaylists,
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines,
        TReplays
    >,
    ...args: A
) => R

export type SonolusRouteHandler = SonolusCallback<
    [session: string | undefined, req: Request, res: Response],
    Promise<void>
>

export type SonolusItemsConfig<
    TSonolus extends SonolusBase,
    TConfig extends ItemsConfig,
    TDatabaseItem,
> = {
    searches: TConfig['searches']
    infoHandler: ItemInfoHandler<TSonolus, TDatabaseItem>
    listHandler: ItemListHandler<TSonolus, ParsedQuery<TConfig['searches']>, TDatabaseItem>
    detailsHandler: ItemDetailsHandler<TSonolus, TDatabaseItem>
}

export const defaultItemsConfig = {
    searches: {},
} as const satisfies ItemsConfig

export class Sonolus<
    TPosts extends ItemsConfig = typeof defaultItemsConfig,
    TPlaylists extends ItemsConfig = typeof defaultItemsConfig,
    TLevels extends ItemsConfig = typeof defaultItemsConfig,
    TSkins extends ItemsConfig = typeof defaultItemsConfig,
    TBackgrounds extends ItemsConfig = typeof defaultItemsConfig,
    TEffects extends ItemsConfig = typeof defaultItemsConfig,
    TParticles extends ItemsConfig = typeof defaultItemsConfig,
    TEngines extends ItemsConfig = typeof defaultItemsConfig,
    TReplays extends ItemsConfig = typeof defaultItemsConfig,
> {
    private readonly fallbackLocale: string

    readonly address?: string
    readonly authentication: boolean
    readonly multiplayer: boolean

    readonly db: Database
    readonly router: Router

    authenticateHandler: AuthenticateHandler = defaultAuthenticateHandler
    sessionHandler: SessionHandler = defaultSessionHandler

    serverInfoHandler: ServerInfoHandler = defaultServerInfoHandler

    readonly posts: SonolusItemsConfig<this, TPosts, DatabasePostItem>
    readonly playlists: SonolusItemsConfig<this, TPlaylists, DatabasePlaylistItem>
    readonly levels: SonolusItemsConfig<this, TLevels, DatabaseLevelItem>
    readonly skins: SonolusItemsConfig<this, TSkins, DatabaseSkinItem>
    readonly backgrounds: SonolusItemsConfig<this, TBackgrounds, DatabaseBackgroundItem>
    readonly effects: SonolusItemsConfig<this, TEffects, DatabaseEffectItem>
    readonly particles: SonolusItemsConfig<this, TParticles, DatabaseParticleItem>
    readonly engines: SonolusItemsConfig<this, TEngines, DatabaseEngineItem>
    readonly replays: SonolusItemsConfig<this, TReplays, DatabaseReplayItem>

    constructor(
        app: Express,
        options?: Partial<{
            address: string
            basePath: string
            authentication: boolean
            multiplayer: boolean
            fallbackLocale: string
            mode: 'custom' | 'redirect' | 'spa'
            redirectPath: string
            spaRoot: string
            postsConfig: TPosts
            playlistsConfig: TPlaylists
            levelsConfig: TLevels
            skinsConfig: TSkins
            backgroundsConfig: TBackgrounds
            effectsConfig: TEffects
            particlesConfig: TParticles
            enginesConfig: TEngines
            replaysConfig: TReplays
        }>,
    ) {
        const {
            address,
            basePath,
            authentication,
            multiplayer,
            fallbackLocale,
            mode,
            redirectPath,
            spaRoot,
            postsConfig,
            playlistsConfig,
            levelsConfig,
            skinsConfig,
            backgroundsConfig,
            effectsConfig,
            particlesConfig,
            enginesConfig,
            replaysConfig,
        } = Object.assign(
            {
                basePath: '',
                authentication: false,
                multiplayer: false,
                sessionDuration: 30 * 60 * 1000,
                fallbackLocale: 'en',
                mode: 'custom',
                postsConfig: defaultItemsConfig,
                playlistsConfig: defaultItemsConfig,
                levelsConfig: defaultItemsConfig,
                skinsConfig: defaultItemsConfig,
                backgroundsConfig: defaultItemsConfig,
                effectsConfig: defaultItemsConfig,
                particlesConfig: defaultItemsConfig,
                enginesConfig: defaultItemsConfig,
                replaysConfig: defaultItemsConfig,
            },
            options,
        )

        this.fallbackLocale = fallbackLocale

        this.address = address
        this.authentication = authentication
        this.multiplayer = multiplayer

        this.db = {
            info: {
                title: {},
            },
            posts: [],
            playlists: [],
            levels: [],
            skins: [],
            backgrounds: [],
            effects: [],
            particles: [],
            engines: [],
            replays: [],
        }

        this.router = express.Router()

        this.posts = {
            searches: postsConfig.searches,
            infoHandler: defaultPostInfoHandler,
            listHandler: defaultPostListHandler,
            detailsHandler: defaultPostDetailsHandler,
        }
        this.playlists = {
            searches: playlistsConfig.searches,
            infoHandler: defaultPlaylistInfoHandler,
            listHandler: defaultPlaylistListHandler,
            detailsHandler: defaultPlaylistDetailsHandler,
        }
        this.levels = {
            searches: levelsConfig.searches,
            infoHandler: defaultLevelInfoHandler,
            listHandler: defaultLevelListHandler,
            detailsHandler: defaultLevelDetailsHandler,
        }
        this.skins = {
            searches: skinsConfig.searches,
            infoHandler: defaultSkinInfoHandler,
            listHandler: defaultSkinListHandler,
            detailsHandler: defaultSkinDetailsHandler,
        }
        this.backgrounds = {
            searches: backgroundsConfig.searches,
            infoHandler: defaultBackgroundInfoHandler,
            listHandler: defaultBackgroundListHandler,
            detailsHandler: defaultBackgroundDetailsHandler,
        }
        this.effects = {
            searches: effectsConfig.searches,
            infoHandler: defaultEffectInfoHandler,
            listHandler: defaultEffectListHandler,
            detailsHandler: defaultEffectDetailsHandler,
        }
        this.particles = {
            searches: particlesConfig.searches,
            infoHandler: defaultParticleInfoHandler,
            listHandler: defaultParticleListHandler,
            detailsHandler: defaultParticleDetailsHandler,
        }
        this.engines = {
            searches: enginesConfig.searches,
            infoHandler: defaultEngineInfoHandler,
            listHandler: defaultEngineListHandler,
            detailsHandler: defaultEngineDetailsHandler,
        }
        this.replays = {
            searches: replaysConfig.searches,
            infoHandler: defaultReplayInfoHandler,
            listHandler: defaultReplayListHandler,
            detailsHandler: defaultReplayDetailsHandler,
        }

        this.postAuthenticate()

        this.getAPI('/sonolus/info', serverInfoRouteHandler)

        this.getAPI('/sonolus/posts/info', postInfoRouteHandler)
        this.getAPI('/sonolus/playlists/info', playlistInfoRouteHandler)
        this.getAPI('/sonolus/levels/info', levelInfoRouteHandler)
        this.getAPI('/sonolus/skins/info', skinInfoRouteHandler)
        this.getAPI('/sonolus/backgrounds/info', backgroundInfoRouteHandler)
        this.getAPI('/sonolus/effects/info', effectInfoRouteHandler)
        this.getAPI('/sonolus/particles/info', particleInfoRouteHandler)
        this.getAPI('/sonolus/engines/info', engineInfoRouteHandler)
        this.getAPI('/sonolus/replays/info', replayInfoRouteHandler)

        this.getAPI('/sonolus/posts/list', postListRouteHandler)
        this.getAPI('/sonolus/playlists/list', playlistListRouteHandler)
        this.getAPI('/sonolus/levels/list', levelListRouteHandler)
        this.getAPI('/sonolus/skins/list', skinListRouteHandler)
        this.getAPI('/sonolus/backgrounds/list', backgroundListRouteHandler)
        this.getAPI('/sonolus/effects/list', effectListRouteHandler)
        this.getAPI('/sonolus/particles/list', particleListRouteHandler)
        this.getAPI('/sonolus/engines/list', engineListRouteHandler)
        this.getAPI('/sonolus/replays/list', replayListRouteHandler)

        this.getAPI('/sonolus/posts/:name', postDetailsRouteHandler)
        this.getAPI('/sonolus/playlists/:name', playlistDetailsRouteHandler)
        this.getAPI('/sonolus/levels/:name', levelDetailsRouteHandler)
        this.getAPI('/sonolus/skins/:name', skinDetailsRouteHandler)
        this.getAPI('/sonolus/backgrounds/:name', backgroundDetailsRouteHandler)
        this.getAPI('/sonolus/effects/:name', effectDetailsRouteHandler)
        this.getAPI('/sonolus/particles/:name', particleDetailsRouteHandler)
        this.getAPI('/sonolus/engines/:name', engineDetailsRouteHandler)
        this.getAPI('/sonolus/replays/:name', replayDetailsRouteHandler)

        app.use(basePath, this.router)

        if (mode === 'spa') {
            if (!spaRoot) throw new Error('Missing SPA root')

            installSPA(app, basePath, spaRoot)
        } else if (mode === 'redirect') {
            if (!redirectPath) throw new Error('Missing redirect path')

            installRedirect(app, basePath, redirectPath)
        }
    }

    public load(path: string): void {
        const dbPath = `${path}/db.json`
        const db = databaseParser(JSON.parse(readFileSync(dbPath, 'utf-8')), `${path}/db.json`)

        this.db.info = db.info
        this.db.posts.push(...db.posts)
        this.db.playlists.push(...db.playlists)
        this.db.levels.push(...db.levels)
        this.db.skins.push(...db.skins)
        this.db.backgrounds.push(...db.backgrounds)
        this.db.effects.push(...db.effects)
        this.db.particles.push(...db.particles)
        this.db.engines.push(...db.engines)
        this.db.replays.push(...db.replays)

        this.router.use('/sonolus/repository', express.static(`${path}/repository`))
    }

    public add(data: Buffer | string, hash?: string): SRL {
        if (!hash) {
            hash = sonolusHash(typeof data === 'string' ? readFileSync(data) : data)
        }

        const url = `/sonolus/repository/${hash}`

        if (typeof data === 'string') {
            const path = resolve(data)
            this.router.get(url, (req, res) => {
                res.sendFile(path)
            })
        } else {
            this.router.get(url, (req, res) => {
                res.send(data)
            })
        }

        return { hash, url }
    }

    public localize(text: LocalizationText, locale: string): string {
        return localize(text, locale, this.fallbackLocale)
    }

    private postAuthenticate() {
        if (!this.authentication) return

        this.router.post(
            '/sonolus/authenticate',
            express.raw({ type: 'application/json' }),
            async (req, res) => {
                res.set('Sonolus-Version', version.sonolus)

                try {
                    const body = req.body as unknown
                    if (!(body instanceof Buffer)) {
                        res.status(400).end()
                        return
                    }

                    const parseResult = authenticateServerRequestSchema.safeParse(
                        JSON.parse(body as never),
                    )
                    if (!parseResult.success) {
                        res.status(400).end()
                        return
                    }

                    if (parseResult.data.address !== this.address) {
                        res.status(400).end()
                        return
                    }

                    const signature = req.headers['sonolus-signature']
                    if (typeof signature !== 'string') {
                        res.status(400).end()
                        return
                    }

                    const signaturePublicKey = await getSignaturePublicKey()

                    const verifyResult = await webcrypto.subtle.verify(
                        { name: 'ECDSA', hash: 'SHA-256' },
                        signaturePublicKey,
                        Buffer.from(signature, 'base64'),
                        body,
                    )
                    if (!verifyResult) {
                        res.status(400).end()
                        return
                    }

                    const response = await this.authenticateHandler(this, parseResult.data)
                    if (!response) {
                        res.status(401).end()
                        return
                    }

                    res.json(response)
                } catch (error) {
                    console.error('[ERROR]', error)
                    res.status(500).end()
                }
            },
        )
    }

    private getAPI(path: string, handler: SonolusRouteHandler) {
        this.router.get(path, async (req, res) => {
            req.localize = (text: LocalizationText) =>
                this.localize(text, req.query.localization as string)

            res.set('Sonolus-Version', version.sonolus)

            try {
                const session =
                    typeof req.headers['sonolus-session'] === 'string'
                        ? req.headers['sonolus-session']
                        : undefined

                if (!(await this.sessionHandler(this, session))) {
                    res.status(401).end()
                    return
                }

                await handler(this, session, req, res)
            } catch (error) {
                console.error('[ERROR]', error)
                res.status(500).end()
            }
        })
    }
}

const installSPA = (app: Express, basePath: string, spaRoot: string) => {
    const indexPath = resolve(spaRoot, 'index.html')

    app.use(basePath, express.static(spaRoot))

    for (const type of [
        'posts',
        'playlists',
        'levels',
        'skins',
        'backgrounds',
        'effects',
        'particles',
        'engines',
        'replays',
    ]) {
        app.get(`${basePath}/${type}/:any`, (req, res) => {
            res.sendFile(indexPath)
        })
    }

    app.use(basePath, (req, res) => {
        res.status(404).sendFile(indexPath)
    })
}

const installRedirect = (app: Express, basePath: string, redirectPath: string) => {
    app.get(basePath, (req, res) => {
        res.redirect(`https://open.sonolus.com/${redirectPath}`)
    })

    for (const type of [
        'posts',
        'playlists',
        'levels',
        'skins',
        'backgrounds',
        'effects',
        'particles',
        'engines',
        'replays',
    ]) {
        app.get(`${basePath}/${type}/info`, (req, res) => {
            res.redirect(`https://open.sonolus.com/${redirectPath}/${type}/info`)
        })

        app.get(`${basePath}/${type}/list`, (req, res) => {
            res.redirect(
                `https://open.sonolus.com/${redirectPath}/${type}/list${getSearch(req.query)}`,
            )
        })

        app.get(`${basePath}/${type}/:name`, (req, res) => {
            res.redirect(`https://open.sonolus.com/${redirectPath}/${type}/${req.params.name}`)
        })
    }
}

const getSearch = (query: ParsedQs) => {
    const params = new URLSearchParams()

    for (const key in query) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        params.append(key, `${query[key]}`)
    }

    const queryString = params.toString()
    return queryString && `?${queryString}`
}
