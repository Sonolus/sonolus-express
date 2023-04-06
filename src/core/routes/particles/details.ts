import { Request, Response } from 'express'
import { InfoDetails, ParticleInfo } from 'sonolus-core'
import { ItemsConfig, Sonolus } from '../..'
import { toParticleItem } from '../../../api/particle-item'
import {
    DetailsHandler,
    defaultDetailsHandler,
    detailsRouteHandler,
} from '../details'

export type ParticleDetailsHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig
> = DetailsHandler<
    TLevels,
    TSkins,
    TBackgrounds,
    TEffects,
    TParticles,
    TEngines,
    ParticleInfo
>

export function defaultParticleDetailsHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig
>(
    sonolus: Sonolus<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines
    >,
    name: string
): InfoDetails<ParticleInfo> | undefined {
    return defaultDetailsHandler(sonolus.db.particles, name)
}

export function particleDetailsRouteHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig
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
    return detailsRouteHandler(
        sonolus,
        sonolus.particleDetailsHandler,
        toParticleItem,
        req,
        res
    )
}
