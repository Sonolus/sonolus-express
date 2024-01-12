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
    TReplays extends ItemsConfig,
    T,
> = ListHandler<
    TLevels,
    TSkins,
    TBackgrounds,
    TEffects,
    TParticles,
    TEngines,
    TReplays,
    T,
    EffectInfo
>

export const defaultEffectListHandler = <
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
    TReplays extends ItemsConfig,
>(
    sonolus: Sonolus<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines, TReplays>,
    query: Record<string, unknown>,
    page: number,
): {
    pageCount: number
    infos: EffectInfo[]
} => defaultListHandler(sonolus.db.effects, filterEffectInfosByKeywords, query, page)

export const filterEffectInfosByKeywords = (infos: EffectInfo[], keywords: string): EffectInfo[] =>
    filterInfosByKeywords(infos, ['name', 'title', 'subtitle', 'author', 'description'], keywords)

export const effectListRouteHandler = <
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
    TReplays extends ItemsConfig,
>(
    sonolus: Sonolus<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines, TReplays>,
    req: Request,
    res: Response,
): Promise<void> =>
    listRouteHandler(
        sonolus,
        sonolus.effectListHandler,
        toEffectItem,
        sonolus.effectsConfig.search,
        req,
        res,
    )
