import { Request, Response } from 'express'
import { Database } from 'sonolus-core'
import { toServerInfo } from '../../api/server-info'
import { Promisable } from '../../utils/types'
import { ItemsConfig, Sonolus } from '../sonolus'

export type ServerInfoHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
> = (
    sonolus: Sonolus<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines>,
) => Promisable<Database>

export function defaultServerInfoHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
>(sonolus: Sonolus<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines>): Database {
    return {
        info: sonolus.db.info,
        levels: sonolus.db.levels.slice(0, 5),
        skins: sonolus.db.skins.slice(0, 5),
        backgrounds: sonolus.db.backgrounds.slice(0, 5),
        effects: sonolus.db.effects.slice(0, 5),
        particles: sonolus.db.particles.slice(0, 5),
        engines: sonolus.db.engines.slice(0, 5),
    }
}

export async function serverInfoRouteHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
>(
    sonolus: Sonolus<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines>,
    req: Request,
    res: Response,
): Promise<void> {
    res.json(
        toServerInfo(
            await sonolus.serverInfoHandler(sonolus),
            sonolus.db,
            req.localize,
            sonolus.levelsConfig.search,
            sonolus.skinsConfig.search,
            sonolus.backgroundsConfig.search,
            sonolus.effectsConfig.search,
            sonolus.particlesConfig.search,
            sonolus.enginesConfig.search,
        ),
    )
}
