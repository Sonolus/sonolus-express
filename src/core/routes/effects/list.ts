import { Request, Response } from 'express'
import { EffectInfo } from 'sonolus-core'
import { toEffectItem } from '../../../api/effect-item'
import { ItemsConfig, Sonolus } from '../../sonolus'
import { ListHandler, defaultListHandler, filterInfosByKeywords, listRouteHandler } from '../list'

export type EffectListHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
    T,
> = ListHandler<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines, T, EffectInfo>

export function defaultEffectListHandler<
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
    infos: EffectInfo[]
} {
    return defaultListHandler(sonolus.db.effects, filterEffectInfosByKeywords, query, page)
}

export function filterEffectInfosByKeywords(infos: EffectInfo[], keywords: string): EffectInfo[] {
    return filterInfosByKeywords(
        infos,
        ['name', 'title', 'subtitle', 'author', 'description'],
        keywords,
    )
}

export function effectListRouteHandler<
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
    return listRouteHandler(
        sonolus,
        sonolus.effectListHandler,
        toEffectItem,
        sonolus.effectsConfig.search,
        req,
        res,
    )
}
