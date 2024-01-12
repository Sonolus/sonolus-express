import { Request, Response } from 'express'
import { EffectInfo, InfoDetails } from 'sonolus-core'
import { ItemsConfig, Sonolus } from '../..'
import { toEffectItem } from '../../../api/effect-item'
import { DetailsHandler, defaultDetailsHandler, detailsRouteHandler } from '../details'

export type EffectDetailsHandler<
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
    EffectInfo
>

export const defaultEffectDetailsHandler = <
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
): InfoDetails<EffectInfo> | undefined => defaultDetailsHandler(sonolus.db.effects, name)

export const effectDetailsRouteHandler = <
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
    detailsRouteHandler(sonolus, sonolus.effectDetailsHandler, toEffectItem, req, res)
