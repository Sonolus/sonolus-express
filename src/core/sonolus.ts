import * as express from 'express'
import { Application, Request, RequestHandler, Response } from 'express'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import {
    Database,
    hash as sonolusHash,
    LocalizationText,
    localize,
    OptionName,
    OptionPlaceholder,
    ResourceType,
    SRL,
    version,
} from 'sonolus-core'
import { databaseParser, Query, SearchInfo } from '..'
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
    readonly app: Application
    readonly basePath: string
    readonly fallbackLocale: string
    readonly levelsConfig: TLevels
    readonly skinsConfig: TSkins
    readonly backgroundsConfig: TBackgrounds
    readonly effectsConfig: TEffects
    readonly particlesConfig: TParticles
    readonly enginesConfig: TEngines

    readonly db: Database

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
            fallbackLocale: string
            levels: TLevels
            skins: TSkins
            backgrounds: TBackgrounds
            effects: TEffects
            particles: TParticles
            engines: TEngines
        }>
    ) {
        this.app = app

        const {
            basePath,
            fallbackLocale,
            levels,
            skins,
            backgrounds,
            effects,
            particles,
            engines,
        } = Object.assign(
            {
                basePath: '',
                fallbackLocale: 'en',
                levels: defaultItemsConfig,
                skins: defaultItemsConfig,
                backgrounds: defaultItemsConfig,
                effects: defaultItemsConfig,
                particles: defaultItemsConfig,
                engines: defaultItemsConfig,
            },
            options
        )
        this.basePath = basePath
        this.fallbackLocale = fallbackLocale
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

        this.use('', (req, res, next) => {
            res.set('Sonolus-Version', version.sonolus)
            next()
        })

        this.get('/sonolus/info', serverInfoRouteHandler)

        this.get('/sonolus/levels/list', levelListRouteHandler)
        this.get('/sonolus/skins/list', skinListRouteHandler)
        this.get('/sonolus/backgrounds/list', backgroundListRouteHandler)
        this.get('/sonolus/effects/list', effectListRouteHandler)
        this.get('/sonolus/particles/list', particleListRouteHandler)
        this.get('/sonolus/engines/list', engineListRouteHandler)

        this.get('/sonolus/levels/:name', levelDetailsRouteHandler)
        this.get('/sonolus/skins/:name', skinDetailsRouteHandler)
        this.get('/sonolus/backgrounds/:name', backgroundDetailsRouteHandler)
        this.get('/sonolus/effects/:name', effectDetailsRouteHandler)
        this.get('/sonolus/particles/:name', particleDetailsRouteHandler)
        this.get('/sonolus/engines/:name', engineDetailsRouteHandler)
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

        this.use('/sonolus/repository', express.static(`${path}/repository`))
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
            this.get(url, async (sonolus, req, res) => {
                res.sendFile(path)
            })
        } else {
            this.get(url, async (sonolus, req, res) => {
                res.send(data)
            })
        }

        return { type, hash, url }
    }

    public localize(text: LocalizationText, locale: string): string {
        return localize(text, locale, this.fallbackLocale)
    }

    private use(name: string, handler: RequestHandler) {
        this.app.use(`${this.basePath}${name}`, handler)
    }

    private get(
        name: string,
        handler: (sonolus: this, req: Request, res: Response) => Promise<void>
    ) {
        this.app.get(`${this.basePath}${name}`, async (req, res) => {
            req.localize = (text) =>
                this.localize(text, req.query.localization as string)

            try {
                await handler(this, req, res)
            } catch (error) {
                console.error('[ERROR]', error)
                res.status(500).end()
            }
        })
    }
}
