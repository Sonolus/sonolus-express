import { Request, Response } from 'express'
import { InfoDetails, LevelInfo } from 'sonolus-core'
import { ItemsConfig, Sonolus } from '../..'
import { toLevelItem } from '../../../api/level-item'
import { DetailsHandler, defaultDetailsHandler, detailsRouteHandler } from '../details'

export type LevelDetailsHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
> = DetailsHandler<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines, LevelInfo>

export const defaultLevelDetailsHandler = <
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
>(
    sonolus: Sonolus<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines>,
    name: string,
): InfoDetails<LevelInfo> | undefined => defaultDetailsHandler(sonolus.db.levels, name)

export const levelDetailsRouteHandler = <
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
): Promise<void> => detailsRouteHandler(sonolus, sonolus.levelDetailsHandler, toLevelItem, req, res)
