import { Request, Response } from 'express'
import { LevelInfo } from 'sonolus-core'
import { toLevelItem } from '../../../api/level-item'
import { SectionOption, Sonolus } from '../../sonolus'
import { defaultListHandler, ListHandler, listRouteHandler } from '../list'

export type LevelListHandler<
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
    LevelInfo
>

export function defaultLevelListHandler<
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
    infos: LevelInfo[]
} {
    return defaultListHandler(
        sonolus.db.levels,
        ['name', 'rating', 'title', 'artists', 'author', 'description'],
        query,
        page
    )
}

export function levelListRouteHandler<
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
        sonolus.levelListHandler,
        toLevelItem,
        sonolus.levelsOption.search,
        req,
        res
    )
}
