import { Request, Response } from 'express'
import { Database } from 'sonolus-core'
import { toServerInfo } from '../../api/server-info'
import { Promisable } from '../../utils/types'
import { Sonolus } from '../sonolus'

export type ServerInfoHandler = (sonolus: Sonolus) => Promisable<Database>

export function defaultServerInfoHandler(sonolus: Sonolus): Database {
    return {
        levels: sonolus.db.levels.slice(0, 5),
        skins: sonolus.db.skins.slice(0, 5),
        backgrounds: sonolus.db.backgrounds.slice(0, 5),
        effects: sonolus.db.effects.slice(0, 5),
        particles: sonolus.db.particles.slice(0, 5),
        engines: sonolus.db.engines.slice(0, 5),
    }
}

export async function serverInfoRouteHandler(
    sonolus: Sonolus,
    req: Request,
    res: Response
): Promise<void> {
    res.json(
        toServerInfo(
            await sonolus.serverInfoHandler(sonolus),
            sonolus.db,
            req.localize,
            sonolus.levelsOption.search,
            sonolus.skinsOption.search,
            sonolus.backgroundsOption.search,
            sonolus.effectsOption.search,
            sonolus.particlesOption.search,
            sonolus.enginesOption.search
        )
    )
}
