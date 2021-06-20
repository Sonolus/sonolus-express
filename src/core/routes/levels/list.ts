import { Request, Response } from 'express'
import { toLevelItem } from '../../../api/level-item'
import { LevelInfo } from '../../../jtd/level-info'
import { Sonolus } from '../../sonolus'
import { defaultListHandler, ListHandler, listRouteHandler } from '../list'

export type LevelListHandler = ListHandler<LevelInfo>

export function defaultLevelListHandler(
    sonolus: Sonolus,
    keywords: string | undefined,
    page: number
): {
    pageCount: number
    infos: LevelInfo[]
} {
    return defaultListHandler(
        sonolus.db.levels,
        ['name', 'rating', 'title', 'artists', 'author', 'description'],
        keywords,
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
        req,
        res
    )
}
