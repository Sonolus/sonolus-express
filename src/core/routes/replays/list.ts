import { Request, Response } from 'express'
import { ReplayInfo } from 'sonolus-core'
import { toReplayItem } from '../../../api/replay-item'
import { ItemsConfig, Sonolus } from '../../sonolus'
import { ListHandler, defaultListHandler, filterInfosByKeywords, listRouteHandler } from '../list'

export type ReplayListHandler<
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
    ReplayInfo
>

export const defaultReplayListHandler = <
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
    infos: ReplayInfo[]
} => defaultListHandler(sonolus.db.replays, filterReplayInfosByKeywords, query, page)

export const filterReplayInfosByKeywords = (infos: ReplayInfo[], keywords: string): ReplayInfo[] =>
    filterInfosByKeywords(infos, ['name', 'title', 'subtitle', 'author', 'description'], keywords)

export const replayListRouteHandler = <
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
        sonolus.replayListHandler,
        toReplayItem,
        sonolus.replaysConfig.search,
        req,
        res,
    )
