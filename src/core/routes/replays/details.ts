import { Request, Response } from 'express'
import { InfoDetails, ReplayInfo } from 'sonolus-core'
import { ItemsConfig, Sonolus } from '../..'
import { toReplayItem } from '../../../api/replay-item'
import { DetailsHandler, defaultDetailsHandler, detailsRouteHandler } from '../details'

export type ReplayDetailsHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
    TReplays extends ItemsConfig,
> = DetailsHandler<
    TLevels,
    TSkins,
    TBackgrounds,
    TEffects,
    TParticles,
    TEngines,
    TReplays,
    ReplayInfo
>

export const defaultReplayDetailsHandler = <
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
    TReplays extends ItemsConfig,
>(
    sonolus: Sonolus<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines, TReplays>,
    name: string,
): InfoDetails<ReplayInfo> | undefined => defaultDetailsHandler(sonolus.db.replays, name)

export const replayDetailsRouteHandler = <
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
    detailsRouteHandler(sonolus, sonolus.replayDetailsHandler, toReplayItem, req, res)
