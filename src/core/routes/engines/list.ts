import { Request, Response } from 'express'
import { EngineInfo } from 'sonolus-core'
import { toEngineItem } from '../../../api/engine-item'
import { ItemsConfig, Sonolus } from '../../sonolus'
import { ListHandler, defaultListHandler, filterInfosByKeywords, listRouteHandler } from '../list'

export type EngineListHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
    T,
> = ListHandler<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines, T, EngineInfo>

export const defaultEngineListHandler = <
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
    infos: EngineInfo[]
} => defaultListHandler(sonolus.db.engines, filterEngineInfosByKeywords, query, page)

export const filterEngineInfosByKeywords = (infos: EngineInfo[], keywords: string): EngineInfo[] =>
    filterInfosByKeywords(infos, ['name', 'title', 'subtitle', 'author', 'description'], keywords)

export const engineListRouteHandler = <
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
        sonolus.engineListHandler,
        toEngineItem,
        sonolus.enginesConfig.search,
        req,
        res,
    )
