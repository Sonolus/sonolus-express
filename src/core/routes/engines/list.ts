import { Request, Response } from 'express'
import { EngineInfo } from 'sonolus-core'
import { toEngineItem } from '../../../api/engine-item'
import { SectionOption, Sonolus } from '../../sonolus'
import { defaultListHandler, ListHandler, listRouteHandler } from '../list'

export type EngineListHandler<
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
    EngineInfo
>

export function defaultEngineListHandler<
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
    infos: EngineInfo[]
} {
    return defaultListHandler(
        sonolus.db.engines,
        ['name', 'title', 'subtitle', 'author', 'description'],
        query,
        page
    )
}

export function engineListRouteHandler<
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
        sonolus.engineListHandler,
        toEngineItem,
        sonolus.enginesOption.search,
        req,
        res
    )
}
