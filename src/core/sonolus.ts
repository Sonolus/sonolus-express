import * as express from 'express'
import { Application, Request, RequestHandler, Response } from 'express'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import {
    Database,
    hash as sonolusHash,
    LocalizationText,
    ResourceType,
    SRL,
    version,
} from 'sonolus-core'
import { databaseParser, SearchInfo } from '..'
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

export type SectionOption = {
    search: SearchInfo
}

export const defaultSectionOption = {
    search: {
        options: {
            keywords: {
                name: { en: '#KEYWORDS' },
                type: 'text',
                placeholder: '#KEYWORDS',
            },
        },
    },
} as const

export class Sonolus {
    readonly app: Application
    readonly basePath: string
    readonly fallbackLocale: string
    readonly levelsOption: SectionOption
    readonly skinsOption: SectionOption
    readonly backgroundsOption: SectionOption
    readonly effectsOption: SectionOption
    readonly particlesOption: SectionOption
    readonly enginesOption: SectionOption

    readonly db: Database

    serverInfoHandler: ServerInfoHandler = defaultServerInfoHandler

    levelListHandler: LevelListHandler = defaultLevelListHandler
    skinListHandler: SkinListHandler = defaultSkinListHandler
    backgroundListHandler: BackgroundListHandler = defaultBackgroundListHandler
    effectListHandler: EffectListHandler = defaultEffectListHandler
    particleListHandler: ParticleListHandler = defaultParticleListHandler
    engineListHandler: EngineListHandler = defaultEngineListHandler

    levelDetailsHandler: LevelDetailsHandler = defaultLevelDetailsHandler
    skinDetailsHandler: SkinDetailsHandler = defaultSkinDetailsHandler
    backgroundDetailsHandler: BackgroundDetailsHandler =
        defaultBackgroundDetailsHandler
    effectDetailsHandler: EffectDetailsHandler = defaultEffectDetailsHandler
    particleDetailsHandler: ParticleDetailsHandler =
        defaultParticleDetailsHandler
    engineDetailsHandler: EngineDetailsHandler = defaultEngineDetailsHandler

    constructor(
        app: Application,
        options?: Partial<{
            basePath: string
            fallbackLocale: string
            levels: SectionOption
            skins: SectionOption
            backgrounds: SectionOption
            effects: SectionOption
            particles: SectionOption
            engines: SectionOption
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
                levels: defaultSectionOption,
                skins: defaultSectionOption,
                backgrounds: defaultSectionOption,
                effects: defaultSectionOption,
                particles: defaultSectionOption,
                engines: defaultSectionOption,
            },
            options
        )
        this.basePath = basePath
        this.fallbackLocale = fallbackLocale
        this.levelsOption = levels
        this.skinsOption = skins
        this.backgroundsOption = backgrounds
        this.effectsOption = effects
        this.particlesOption = particles
        this.enginesOption = engines

        this.db = {
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

        this.get('/info', serverInfoRouteHandler)

        this.get('/levels/list', levelListRouteHandler)
        this.get('/skins/list', skinListRouteHandler)
        this.get('/backgrounds/list', backgroundListRouteHandler)
        this.get('/effects/list', effectListRouteHandler)
        this.get('/particles/list', particleListRouteHandler)
        this.get('/engines/list', engineListRouteHandler)

        this.get('/levels/:name', levelDetailsRouteHandler)
        this.get('/skins/:name', skinDetailsRouteHandler)
        this.get('/backgrounds/:name', backgroundDetailsRouteHandler)
        this.get('/effects/:name', effectDetailsRouteHandler)
        this.get('/particles/:name', particleDetailsRouteHandler)
        this.get('/engines/:name', engineDetailsRouteHandler)
    }

    public load(path: string): void {
        const dbPath = `${path}/db.json`
        const db = databaseParser(
            JSON.parse(readFileSync(dbPath, 'utf-8')),
            `${path}/db.json`
        )

        this.db.levels.push(...db.levels)
        this.db.skins.push(...db.skins)
        this.db.backgrounds.push(...db.backgrounds)
        this.db.effects.push(...db.effects)
        this.db.particles.push(...db.particles)
        this.db.engines.push(...db.engines)

        this.use('/repository', express.static(`${path}/repository`))
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

        const url = `/repository/${type}/${hash}`

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
        return (
            text[locale] ||
            text[this.fallbackLocale] ||
            Object.values(text)[0] ||
            ''
        )
    }

    private use(name: string, handler: RequestHandler) {
        this.app.use(`${this.basePath}${name}`, handler)
    }

    private get(
        name: string,
        handler: (
            sonolus: Sonolus,
            req: Request,
            res: Response
        ) => Promise<void>
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
