import { Request, Response } from 'express'
import { EffectInfo } from 'sonolus-core'
import { toEffectItem } from '../../../api/effect-item'
import { Sonolus } from '../../sonolus'
import { defaultListHandler, ListHandler, listRouteHandler } from '../list'

export type EffectListHandler = ListHandler<EffectInfo>

export function defaultEffectListHandler(
    sonolus: Sonolus,
    keywords: string | undefined,
    page: number
): {
    pageCount: number
    infos: EffectInfo[]
} {
    return defaultListHandler(
        sonolus.db.effects,
        ['name', 'title', 'subtitle', 'author', 'description'],
        keywords,
        page
    )
}

export function effectListRouteHandler(
    sonolus: Sonolus,
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
