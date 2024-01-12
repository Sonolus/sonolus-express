import { Request, Response } from 'express'
import { EngineInfo, InfoDetails } from 'sonolus-core'
import { ItemsConfig, Sonolus } from '../..'
import { toEngineItem } from '../../../api/engine-item'
import { DetailsHandler, defaultDetailsHandler, detailsRouteHandler } from '../details'

export type EngineDetailsHandler<
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
    EngineInfo
>

export const defaultEngineDetailsHandler = <
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
): InfoDetails<EngineInfo> | undefined => defaultDetailsHandler(sonolus.db.engines, name)

export const engineDetailsRouteHandler = <
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
    detailsRouteHandler(sonolus, sonolus.engineDetailsHandler, toEngineItem, req, res)
