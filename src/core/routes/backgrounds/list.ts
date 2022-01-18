import { Request, Response } from 'express'
import { BackgroundInfo } from 'sonolus-core'
import { toBackgroundItem } from '../../../api/background-item'
import { Sonolus } from '../../sonolus'
import { defaultListHandler, ListHandler, listRouteHandler } from '../list'

export type BackgroundListHandler<T> = ListHandler<T, BackgroundInfo>

export function defaultBackgroundListHandler(
    sonolus: Sonolus,
    query: Record<string, unknown>,
    page: number
): {
    pageCount: number
    infos: BackgroundInfo[]
} {
    return defaultListHandler(
        sonolus.db.backgrounds,
        ['name', 'title', 'subtitle', 'author', 'description'],
        query,
        page
    )
}

export function backgroundListRouteHandler(
    sonolus: Sonolus,
    req: Request,
    res: Response
): Promise<void> {
    return listRouteHandler(
        sonolus,
        sonolus.backgroundListHandler,
        toBackgroundItem,
        sonolus.backgroundsOption.search,
        req,
        res
    )
}
