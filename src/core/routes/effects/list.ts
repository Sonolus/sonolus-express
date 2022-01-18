import { Request, Response } from 'express'
import { EffectInfo } from 'sonolus-core'
import { toEffectItem } from '../../../api/effect-item'
import { SectionOption, Sonolus } from '../../sonolus'
import { defaultListHandler, ListHandler, listRouteHandler } from '../list'

export type EffectListHandler<
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
    EffectInfo
>

export function defaultEffectListHandler<
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
    infos: EffectInfo[]
} {
    return defaultListHandler(
        sonolus.db.effects,
        ['name', 'title', 'subtitle', 'author', 'description'],
        query,
        page
    )
}

export function effectListRouteHandler<
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
        sonolus.effectListHandler,
        toEffectItem,
        sonolus.effectsOption.search,
        req,
        res
    )
}
