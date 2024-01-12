import { Request, Response } from 'express'
import { InfoDetails, SkinInfo } from 'sonolus-core'
import { ItemsConfig, Sonolus } from '../..'
import { toSkinItem } from '../../../api/skin-item'
import { DetailsHandler, defaultDetailsHandler, detailsRouteHandler } from '../details'

export type SkinDetailsHandler<
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
    SkinInfo
>

export const defaultSkinDetailsHandler = <
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
): InfoDetails<SkinInfo> | undefined => defaultDetailsHandler(sonolus.db.skins, name)

export const skinDetailsRouteHandler = <
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
): Promise<void> => detailsRouteHandler(sonolus, sonolus.skinDetailsHandler, toSkinItem, req, res)
