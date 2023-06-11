import { Request, Response } from 'express'
import { LevelInfo } from 'sonolus-core'
import { toLevelItem } from '../../../api/level-item'
import { ItemsConfig, Sonolus } from '../../sonolus'
import { ListHandler, defaultListHandler, filterInfosByKeywords, listRouteHandler } from '../list'

export type LevelListHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
    T,
> = ListHandler<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines, T, LevelInfo>

export function defaultLevelListHandler<
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
    infos: LevelInfo[]
} {
    return defaultListHandler(sonolus.db.levels, filterLevelInfosByKeywords, query, page)
}

export function filterLevelInfosByKeywords(infos: LevelInfo[], keywords: string): LevelInfo[] {
    return filterInfosByKeywords(
        infos,
        ['name', 'rating', 'title', 'artists', 'author', 'description'],
        keywords,
    )
}

export function levelListRouteHandler<
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
        sonolus.levelListHandler,
        toLevelItem,
        sonolus.levelsConfig.search,
        req,
        res,
    )
}
