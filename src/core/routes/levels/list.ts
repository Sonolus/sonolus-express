import { Request, Response } from 'express'
import { LevelInfo } from 'sonolus-core'
import { toLevelItem } from '../../../api/level-item'
import { Sonolus } from '../../sonolus'
import { defaultListHandler, ListHandler, listRouteHandler } from '../list'

export type LevelListHandler<T> = ListHandler<T, LevelInfo>

export function defaultLevelListHandler(
    sonolus: Sonolus,
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

export function levelListRouteHandler(
    sonolus: Sonolus,
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
