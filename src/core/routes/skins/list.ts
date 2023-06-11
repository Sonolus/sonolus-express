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
    T,
> = ListHandler<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines, T, SkinInfo>

export function defaultSkinListHandler<
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
    infos: SkinInfo[]
} {
    return defaultListHandler(sonolus.db.skins, filterSkinInfosByKeywords, query, page)
}

export function filterSkinInfosByKeywords(infos: SkinInfo[], keywords: string): SkinInfo[] {
    return filterInfosByKeywords(
        infos,
        ['name', 'title', 'subtitle', 'author', 'description'],
        keywords,
    )
}

export function skinListRouteHandler<
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
        sonolus.skinListHandler,
        toSkinItem,
        sonolus.skinsConfig.search,
        req,
        res,
    )
}
