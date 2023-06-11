import { Request, Response } from 'express'
import { ParticleInfo } from 'sonolus-core'
import { toParticleItem } from '../../../api/particle-item'
import { ItemsConfig, Sonolus } from '../../sonolus'
import { ListHandler, defaultListHandler, filterInfosByKeywords, listRouteHandler } from '../list'

export type ParticleListHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
    T,
> = ListHandler<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines, T, ParticleInfo>

export const defaultParticleListHandler = <
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
>(
    sonolus: Sonolus<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines>,
    query: Record<string, unknown>,
    page: number,
): {
    pageCount: number
    infos: ParticleInfo[]
} => defaultListHandler(sonolus.db.particles, filterParticleInfosByKeywords, query, page)

export const filterParticleInfosByKeywords = (
    infos: ParticleInfo[],
    keywords: string,
): ParticleInfo[] =>
    filterInfosByKeywords(infos, ['name', 'title', 'subtitle', 'author', 'description'], keywords)

export const particleListRouteHandler = <
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
): Promise<void> =>
    listRouteHandler(
        sonolus,
        sonolus.particleListHandler,
        toParticleItem,
        sonolus.particlesConfig.search,
        req,
        res,
    )
