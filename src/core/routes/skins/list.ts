import { Request, Response } from 'express'
import { SkinInfo } from 'sonolus-core'
import { toSkinItem } from '../../../api/skin-item'
import { SectionOption, Sonolus } from '../../sonolus'
import { defaultListHandler, ListHandler, listRouteHandler } from '../list'

export type SkinListHandler<
    TLevels extends SectionOption,
    TSkins extends SectionOption,
    TBackgrounds extends SectionOption,
    TEffects extends SectionOption,
    TParticles extends SectionOption,
    TEngines extends SectionOption,
    T
> = ListHandler<
    TLevels,
    TSkins,
    TBackgrounds,
    TEffects,
    TParticles,
    TEngines,
    T,
    SkinInfo
>

export function defaultSkinListHandler<
    TLevels extends SectionOption,
    TSkins extends SectionOption,
    TBackgrounds extends SectionOption,
    TEffects extends SectionOption,
    TParticles extends SectionOption,
    TEngines extends SectionOption
>(
    sonolus: Sonolus<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines
    >,
    query: Record<string, unknown>,
    page: number
): {
    pageCount: number
    infos: SkinInfo[]
} {
    return defaultListHandler(
        sonolus.db.skins,
        ['name', 'title', 'subtitle', 'author', 'description'],
        query,
        page
    )
}

export function skinListRouteHandler<
    TLevels extends SectionOption,
    TSkins extends SectionOption,
    TBackgrounds extends SectionOption,
    TEffects extends SectionOption,
    TParticles extends SectionOption,
    TEngines extends SectionOption
>(
    sonolus: Sonolus<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines
    >,
    req: Request,
    res: Response
): Promise<void> {
    return listRouteHandler(
        sonolus,
        sonolus.skinListHandler,
        toSkinItem,
        sonolus.skinsOption.search,
        req,
        res
    )
}
