import { Request, Response } from 'express'
import { BackgroundInfo, InfoDetails } from 'sonolus-core'
import { ItemsConfig, Sonolus } from '../..'
import { toBackgroundItem } from '../../../api/background-item'
import { DetailsHandler, defaultDetailsHandler, detailsRouteHandler } from '../details'

export type BackgroundDetailsHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
> = DetailsHandler<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines, BackgroundInfo>

export const defaultBackgroundDetailsHandler = <
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
>(
    sonolus: Sonolus<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines>,
    name: string,
): InfoDetails<BackgroundInfo> | undefined => defaultDetailsHandler(sonolus.db.backgrounds, name)

export const backgroundDetailsRouteHandler = <
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
    detailsRouteHandler(sonolus, sonolus.backgroundDetailsHandler, toBackgroundItem, req, res)
