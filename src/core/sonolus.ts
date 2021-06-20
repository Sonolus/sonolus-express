import { createHash } from 'crypto'
import express, {
    Application,
    Request,
    RequestHandler,
    Response,
} from 'express'
import { readFileSync } from 'fs'
import { DB, dbParser } from '../jtd/db'
import { ResourceType, SRL } from '../jtd/srl'
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

export class Sonolus {
    readonly app: Application
    readonly version: string | undefined
    readonly basePath: string
    readonly fallbackLocale: string

    readonly db: DB

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
            version: string
            basePath: string
            fallbackLocale: string
        }>
    ) {
        this.app = app

        const { version, basePath, fallbackLocale } = Object.assign(
            {
                basePath: '',
                fallbackLocale: 'en',
            },
            options
        )
        this.version = version
        this.basePath = basePath
        this.fallbackLocale = fallbackLocale

        this.db = {
            levels: [],
            skins: [],
            backgrounds: [],
            effects: [],
            particles: [],
            engines: [],
        }

        if (this.version) {
            this.use('', (req, res, next) => {
                res.set('Sonolus-Version', this.version)
                next()
            })
        }

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
        const db = dbParser(readFileSync(`${path}/db.json`, 'utf-8'))
        if (!db) {
            throw `${path}/db.json(${dbParser.position}): ${dbParser.message}`
        }

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
            hash = createHash('sha1')
                .update(typeof data === 'string' ? readFileSync(data) : data)
                .digest('hex')
        }

        const url = `/repository/${type}/${hash}`

        if (typeof data === 'string') {
            this.get(url, async (sonolus, req, res) => {
                res.sendFile(data)
            })
        } else {
            this.get(url, async (sonolus, req, res) => {
                res.send(data)
            })
        }

        return { type, hash, url }
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
                text[req.query.localization] ||
                text[this.fallbackLocale] ||
                Object.values(text)[0] ||
                ''

            try {
                await handler(this, req, res)
            } catch (error) {
                console.error('[ERROR]', error)
                res.status(500).end()
            }
        })
    }
}
