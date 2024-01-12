import { Request, Response } from 'express'
import { BackgroundInfo } from 'sonolus-core'
import { toBackgroundItem } from '../../../api/background-item'
import { ItemsConfig, Sonolus } from '../../sonolus'
import { ListHandler, defaultListHandler, filterInfosByKeywords, listRouteHandler } from '../list'

export type BackgroundListHandler<
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
    BackgroundInfo
>

export const defaultBackgroundListHandler = <
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
    infos: BackgroundInfo[]
} => defaultListHandler(sonolus.db.backgrounds, filterBackgroundInfosByKeywords, query, page)

export const filterBackgroundInfosByKeywords = (
    infos: BackgroundInfo[],
    keywords: string,
): BackgroundInfo[] =>
    filterInfosByKeywords(infos, ['name', 'title', 'subtitle', 'author', 'description'], keywords)

export const backgroundListRouteHandler = <
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
        sonolus.backgroundListHandler,
        toBackgroundItem,
        sonolus.backgroundsConfig.search,
        req,
        res,
    )
