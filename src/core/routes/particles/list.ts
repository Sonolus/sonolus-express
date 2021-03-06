import { Request, Response } from 'express'
import { ParticleInfo } from 'sonolus-core'
import { toParticleItem } from '../../../api/particle-item'
import { ItemsConfig, Sonolus } from '../../sonolus'
import {
    defaultListHandler,
    filterInfosByKeywords,
    ListHandler,
    listRouteHandler,
} from '../list'

export type ParticleListHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
    T
> = ListHandler<
    TLevels,
    TSkins,
    TBackgrounds,
    TEffects,
    TParticles,
    TEngines,
    T,
    ParticleInfo
>

export function defaultParticleListHandler<
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
    query: Record<string, unknown>,
    page: number
): {
    pageCount: number
    infos: ParticleInfo[]
} {
    return defaultListHandler(
        sonolus.db.particles,
        filterParticleInfosByKeywords,
        query,
        page
    )
}

export function filterParticleInfosByKeywords(
    infos: ParticleInfo[],
    keywords: string
): ParticleInfo[] {
    return filterInfosByKeywords(
        infos,
        ['name', 'title', 'subtitle', 'author', 'description'],
        keywords
    )
}

export function particleListRouteHandler<
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
    return listRouteHandler(
        sonolus,
        sonolus.particleListHandler,
        toParticleItem,
        sonolus.particlesConfig.search,
        req,
        res
    )
}
