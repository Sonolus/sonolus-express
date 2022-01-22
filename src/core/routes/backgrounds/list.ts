import { Request, Response } from 'express'
import { BackgroundInfo } from 'sonolus-core'
import { toBackgroundItem } from '../../../api/background-item'
import { ItemsConfig, Sonolus } from '../../sonolus'
import {
    defaultListHandler,
    filterInfosByKeywords,
    ListHandler,
    listRouteHandler,
} from '../list'

export type BackgroundListHandler<
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
    BackgroundInfo
>

export function defaultBackgroundListHandler<
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
    infos: BackgroundInfo[]
} {
    return defaultListHandler(
        sonolus.db.backgrounds,
        filterBackgroundInfosByKeywords,
        query,
        page
    )
}

export function filterBackgroundInfosByKeywords(
    infos: BackgroundInfo[],
    keywords: string
): BackgroundInfo[] {
    return filterInfosByKeywords(
        infos,
        ['name', 'title', 'subtitle', 'author', 'description'],
        keywords
    )
}

export function backgroundListRouteHandler<
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
        sonolus.backgroundListHandler,
        toBackgroundItem,
        sonolus.backgroundsConfig.search,
        req,
        res
    )
}
