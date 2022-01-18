import { Request, Response } from 'express'
import { Database } from 'sonolus-core'
import { toServerInfo } from '../../api/server-info'
import { Promisable } from '../../utils/types'
import { SectionOption, Sonolus } from '../sonolus'

export type ServerInfoHandler<
    TLevels extends SectionOption,
    TSkins extends SectionOption,
    TBackgrounds extends SectionOption,
    TEffects extends SectionOption,
    TParticles extends SectionOption,
    TEngines extends SectionOption
> = (
    sonolus: Sonolus<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines
    >
) => Promisable<Database>

export function defaultServerInfoHandler<
    TLevels extends SectionOption,
    TSkins extends SectionOption,
    TBackgrounds extends SectionOption,
    TEffects extends SectionOption,
    TParticles extends SectionOption,
    TEngines extends SectionOption
>(
    sonolus: Sonolus<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines
    >
): Database {
    return {
        levels: sonolus.db.levels.slice(0, 5),
        skins: sonolus.db.skins.slice(0, 5),
        backgrounds: sonolus.db.backgrounds.slice(0, 5),
        effects: sonolus.db.effects.slice(0, 5),
        particles: sonolus.db.particles.slice(0, 5),
        engines: sonolus.db.engines.slice(0, 5),
    }
}

export async function serverInfoRouteHandler<
    TLevels extends SectionOption,
    TSkins extends SectionOption,
    TBackgrounds extends SectionOption,
    TEffects extends SectionOption,
    TParticles extends SectionOption,
    TEngines extends SectionOption
>(
    sonolus: Sonolus<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines
    >,
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
