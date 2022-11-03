import { randomUUID, webcrypto } from 'crypto'
import type { Application, Request, Response, Router } from 'express'
import * as express from 'express'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import type { ParsedQs } from 'qs'
import {
    AuthenticateInfo,
    Database,
    getEncryptionPublicKey,
    hash as sonolusHash,
    LocalizationText,
    localize,
    OptionName,
    OptionPlaceholder,
    ResourceType,
    SessionData,
    SessionInfo,
    SRL,
    version,
} from 'sonolus-core'
import { databaseParser, Query, SearchInfo } from '..'
import { sessionDataSchema } from '../schemas/session-data'
import {
    BackgroundDetailsHandler,
    backgroundDetailsRouteHandler,
    defaultBackgroundDetailsHandler,
} from './routes/backgrounds/details'
import {
    BackgroundListHandler,
    backgroundListRouteHandler,
    defaultBackgroundListHandler,
} from './routes/backgrounds/list'
import {
    defaultEffectDetailsHandler,
    EffectDetailsHandler,
    effectDetailsRouteHandler,
} from './routes/effects/details'
import {
    defaultEffectListHandler,
    EffectListHandler,
    effectListRouteHandler,
} from './routes/effects/list'
import {
    defaultEngineDetailsHandler,
    EngineDetailsHandler,
    engineDetailsRouteHandler,
} from './routes/engines/details'
import {
    defaultEngineListHandler,
    EngineListHandler,
    engineListRouteHandler,
} from './routes/engines/list'
import {
    defaultServerInfoHandler,
    ServerInfoHandler,
    serverInfoRouteHandler,
} from './routes/info'
import {
    defaultLevelDetailsHandler,
    LevelDetailsHandler,
    levelDetailsRouteHandler,
} from './routes/levels/details'
import {
    defaultLevelListHandler,
    LevelListHandler,
    levelListRouteHandler,
} from './routes/levels/list'
import {
    defaultParticleDetailsHandler,
    ParticleDetailsHandler,
    particleDetailsRouteHandler,
} from './routes/particles/details'
import {
    defaultParticleListHandler,
    ParticleListHandler,
    particleListRouteHandler,
} from './routes/particles/list'
import {
    defaultSkinDetailsHandler,
    SkinDetailsHandler,
    skinDetailsRouteHandler,
} from './routes/skins/details'
import {
    defaultSkinListHandler,
    SkinListHandler,
    skinListRouteHandler,
} from './routes/skins/list'
import {
    CheckSessionHandler,
    CreateSessionHandler,
    FindSessionHandler,
} from './session'

export type ItemsConfig = {
    search: SearchInfo
}

export const defaultItemsConfig = {
    search: {
        options: {
            keywords: {
                name: { en: OptionName.Keywords },
                type: 'text',
                placeholder: { en: OptionPlaceholder.Keywords },
            },
        },
    },
} as const

export class Sonolus<
    TLevels extends ItemsConfig = typeof defaultItemsConfig,
    TSkins extends ItemsConfig = typeof defaultItemsConfig,
    TBackgrounds extends ItemsConfig = typeof defaultItemsConfig,
    TEffects extends ItemsConfig = typeof defaultItemsConfig,
    TParticles extends ItemsConfig = typeof defaultItemsConfig,
    TEngines extends ItemsConfig = typeof defaultItemsConfig
> {
    private readonly authentication: boolean
    private readonly sessionDuration: number
    private readonly fallbackLocale: string

    readonly sessionAddress: string

    readonly router: Router

    readonly levelsConfig: TLevels
    readonly skinsConfig: TSkins
    readonly backgroundsConfig: TBackgrounds
    readonly effectsConfig: TEffects
    readonly particlesConfig: TParticles
    readonly enginesConfig: TEngines

    readonly db: Database

    createSessionHandler?: CreateSessionHandler<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines
    >
    findSessionHandler?: FindSessionHandler<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines
    >
    checkSessionHandler?: CheckSessionHandler<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines
    >

    serverInfoHandler: ServerInfoHandler<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines
    > = defaultServerInfoHandler

    levelListHandler: LevelListHandler<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines,
        Query<TLevels['search']>
    > = defaultLevelListHandler
    skinListHandler: SkinListHandler<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines,
        Query<TSkins['search']>
    > = defaultSkinListHandler
    backgroundListHandler: BackgroundListHandler<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines,
        Query<TBackgrounds['search']>
    > = defaultBackgroundListHandler
    effectListHandler: EffectListHandler<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines,
        Query<TEffects['search']>
    > = defaultEffectListHandler
    particleListHandler: ParticleListHandler<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines,
        Query<TParticles['search']>
    > = defaultParticleListHandler
    engineListHandler: EngineListHandler<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines,
        Query<TEngines['search']>
    > = defaultEngineListHandler

    levelDetailsHandler: LevelDetailsHandler<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines
    > = defaultLevelDetailsHandler
    skinDetailsHandler: SkinDetailsHandler<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines
    > = defaultSkinDetailsHandler
    backgroundDetailsHandler: BackgroundDetailsHandler<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines
    > = defaultBackgroundDetailsHandler
    effectDetailsHandler: EffectDetailsHandler<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines
    > = defaultEffectDetailsHandler
    particleDetailsHandler: ParticleDetailsHandler<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines
    > = defaultParticleDetailsHandler
    engineDetailsHandler: EngineDetailsHandler<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines
    > = defaultEngineDetailsHandler

    constructor(
        app: Application,
        options?: Partial<{
            basePath: string
            authentication: boolean
            sessionAddress: string
            sessionDuration: number
            fallbackLocale: string
            mode: 'custom' | 'redirect' | 'spa'
            spaRoot: string
            levels: TLevels
            skins: TSkins
            backgrounds: TBackgrounds
            effects: TEffects
            particles: TParticles
            engines: TEngines
        }>
    ) {
        const {
            basePath,
            authentication,
            sessionAddress,
            sessionDuration,
            fallbackLocale,
            mode,
            spaRoot,
            levels,
            skins,
            backgrounds,
            effects,
            particles,
            engines,
        } = Object.assign(
            {
                basePath: '',
                authentication: false,
                sessionAddress: '',
                sessionDuration: 30 * 60 * 1000,
                fallbackLocale: 'en',
                mode: 'custom',
                levels: defaultItemsConfig,
                skins: defaultItemsConfig,
                backgrounds: defaultItemsConfig,
                effects: defaultItemsConfig,
                particles: defaultItemsConfig,
                engines: defaultItemsConfig,
            },
            options
        )

        this.authentication = authentication
        this.sessionDuration = sessionDuration
        this.fallbackLocale = fallbackLocale

        this.sessionAddress = sessionAddress

        this.router = express.Router()

        this.levelsConfig = levels
        this.skinsConfig = skins
        this.backgroundsConfig = backgrounds
        this.effectsConfig = effects
        this.particlesConfig = particles
        this.enginesConfig = engines

        this.db = {
            info: {
                title: {},
                banner: { type: 'ServerBanner', hash: '', url: '' },
            },
            levels: [],
            skins: [],
            backgrounds: [],
            effects: [],
            particles: [],
            engines: [],
        }

        this.postAuthenticate()

        this.getAPI('/sonolus/info', serverInfoRouteHandler)

        this.getAPI('/sonolus/levels/list', levelListRouteHandler)
        this.getAPI('/sonolus/skins/list', skinListRouteHandler)
        this.getAPI('/sonolus/backgrounds/list', backgroundListRouteHandler)
        this.getAPI('/sonolus/effects/list', effectListRouteHandler)
        this.getAPI('/sonolus/particles/list', particleListRouteHandler)
        this.getAPI('/sonolus/engines/list', engineListRouteHandler)

        this.getAPI('/sonolus/levels/:name', levelDetailsRouteHandler)
        this.getAPI('/sonolus/skins/:name', skinDetailsRouteHandler)
        this.getAPI('/sonolus/backgrounds/:name', backgroundDetailsRouteHandler)
        this.getAPI('/sonolus/effects/:name', effectDetailsRouteHandler)
        this.getAPI('/sonolus/particles/:name', particleDetailsRouteHandler)
        this.getAPI('/sonolus/engines/:name', engineDetailsRouteHandler)

        app.use(basePath, this.router)

        if (mode === 'spa') {
            if (!spaRoot) throw 'Missing SPA root'

            installSPA(app, basePath, spaRoot)
        } else if (mode === 'redirect') {
            installRedirect(app, basePath)
        }
    }

    public load(path: string): void {
        const dbPath = `${path}/db.json`
        const db = databaseParser(
            JSON.parse(readFileSync(dbPath, 'utf-8')),
            `${path}/db.json`
        )

        this.db.info = db.info
        this.db.levels.push(...db.levels)
        this.db.skins.push(...db.skins)
        this.db.backgrounds.push(...db.backgrounds)
        this.db.effects.push(...db.effects)
        this.db.particles.push(...db.particles)
        this.db.engines.push(...db.engines)

        this.router.use(
            '/sonolus/repository',
            express.static(`${path}/repository`)
        )
    }

    public add<T extends ResourceType>(
        type: T,
        data: Buffer | string,
        hash?: string
    ): SRL<T> {
        if (!hash) {
            hash = sonolusHash(
                typeof data === 'string' ? readFileSync(data) : data
            )
        }

        const url = `/sonolus/repository/${type}/${hash}`

        if (typeof data === 'string') {
            const path = resolve(data)
            this.router.get(url, async (req, res) => {
                res.sendFile(path)
            })
        } else {
            this.router.get(url, async (req, res) => {
                res.send(data)
            })
        }

        return { type, hash, url }
    }

    public localize(text: LocalizationText, locale: string): string {
        return localize(text, locale, this.fallbackLocale)
    }

    private postAuthenticate() {
        if (!this.authentication) return

        this.router.post('/sonolus/authenticate', async (req, res) => {
            res.set('Sonolus-Version', version.sonolus)

            try {
                if (!this.createSessionHandler) {
                    res.status(401).end()
                    return
                }

                const encryptionPublicKey = await getEncryptionPublicKey()

                const id = randomUUID()
                const key = await webcrypto.subtle.exportKey(
                    'raw',
                    await webcrypto.subtle.generateKey(
                        { name: 'AES-CBC', length: 256 },
                        true,
                        []
                    )
                )
                const iv = webcrypto.getRandomValues(new Uint8Array(16))
                const expiration = Date.now() + this.sessionDuration

                await this.createSessionHandler(this, id, key, iv, expiration)

                const sessionInfo: SessionInfo = {
                    id,
                    key: Buffer.from(key).toString('base64'),
                    iv: Buffer.from(iv).toString('base64'),
                }
                const session = Buffer.from(
                    await webcrypto.subtle.encrypt(
                        'RSA-OAEP',
                        encryptionPublicKey,
                        Buffer.from(JSON.stringify(sessionInfo))
                    )
                ).toString('base64')

                const response: AuthenticateInfo = {
                    address: this.sessionAddress,
                    session,
                    expiration,
                }

                res.json(response)
            } catch (error) {
                console.error('[ERROR]', error)
                res.status(500).end()
            }
        })
    }

    private getAPI(
        path: string,
        handler: (sonolus: this, req: Request, res: Response) => Promise<void>
    ) {
        this.router.get(path, async (req, res) => {
            req.localize = (text) =>
                this.localize(text, req.query.localization as string)

            res.set('Sonolus-Version', version.sonolus)

            try {
                if (this.authentication && !(await this.checkSession(req))) {
                    res.status(401).end()
                    return
                }

                await handler(this, req, res)
            } catch (error) {
                console.error('[ERROR]', error)
                res.status(500).end()
            }
        })
    }

    private async checkSession(req: Request) {
        if (!this.findSessionHandler) throw 'Missing findSessionHandler'
        if (!this.checkSessionHandler) throw 'Missing checkSessionHandler'

        if (!req.headers['sonolus-session-id']) return false
        const id = `${req.headers['sonolus-session-id']}`

        if (!req.headers['sonolus-session-data']) return false
        const data = `${req.headers['sonolus-session-data']}`

        const session = await this.findSessionHandler(this, id)
        if (!session || Date.now() >= session.expiration) return false

        const key = await webcrypto.subtle.importKey(
            'raw',
            session.key,
            { name: 'AES-CBC' },
            false,
            ['decrypt']
        )

        let sessionData: SessionData
        try {
            sessionData = sessionDataSchema.parse(
                JSON.parse(
                    Buffer.from(
                        await webcrypto.subtle.decrypt(
                            { name: 'AES-CBC', iv: session.iv },
                            key,
                            Buffer.from(data, 'base64')
                        )
                    ).toString()
                )
            )
        } catch (error) {
            return false
        }

        return await this.checkSessionHandler(this, id, sessionData)
    }
}

function installSPA(app: Application, basePath: string, spaRoot: string) {
    const indexPath = resolve(spaRoot, 'index.html')

    app.use(basePath, express.static(spaRoot))
    ;['levels', 'skins', 'backgrounds', 'effects', 'particles', 'engines'].map(
        (type) => {
            app.get(`${basePath}/${type}/:any`, (req, res) => {
                res.sendFile(indexPath)
            })
        }
    )

    app.use(basePath, (req, res) => {
        res.status(404).sendFile(indexPath)
    })
}

function installRedirect(app: Application, basePath: string) {
    app.get(basePath, (req, res) => {
        res.redirect(`sonolus://${req.headers.host}${basePath}`)
    })
    ;['levels', 'skins', 'backgrounds', 'effects', 'particles', 'engines'].map(
        (type) => {
            app.get(`${basePath}/${type}/list`, (req, res) => {
                res.redirect(
                    `sonolus://${
                        req.headers.host
                    }${basePath}/${type}/list${getSearch(req.query)}`
                )
            })

            app.get(`${basePath}/${type}/:name`, (req, res) => {
                res.redirect(
                    `sonolus://${req.headers.host}${basePath}/${type}/${req.params.name}`
                )
            })
        }
    )
}

function getSearch(query: ParsedQs) {
    const params = new URLSearchParams()

    for (const key in query) {
        params.append(key, `${query[key]}`)
    }

    const queryString = params.toString()
    return queryString && `?${queryString}`
}
