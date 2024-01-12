import { Request, Response } from 'express'
import { SkinInfo } from 'sonolus-core'
import { toSkinItem } from '../../../api/skin-item'
import { ItemsConfig, Sonolus } from '../../sonolus'
import { ListHandler, defaultListHandler, filterInfosByKeywords, listRouteHandler } from '../list'

export type SkinListHandler<
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
    SkinInfo
>

export const defaultSkinListHandler = <
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
    infos: SkinInfo[]
} => defaultListHandler(sonolus.db.skins, filterSkinInfosByKeywords, query, page)

export const filterSkinInfosByKeywords = (infos: SkinInfo[], keywords: string): SkinInfo[] =>
    filterInfosByKeywords(infos, ['name', 'title', 'subtitle', 'author', 'description'], keywords)

export const skinListRouteHandler = <
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
        sonolus.skinListHandler,
        toSkinItem,
        sonolus.skinsConfig.search,
        req,
        res,
    )
