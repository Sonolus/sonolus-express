import { Request, Response } from 'express'
import { BackgroundInfo } from 'sonolus-core'
import { toBackgroundItem } from '../../../api/background-item'
import { Sonolus } from '../../sonolus'
import { defaultListHandler, ListHandler, listRouteHandler } from '../list'

export type BackgroundListHandler = ListHandler<BackgroundInfo>

export function defaultBackgroundListHandler(
    sonolus: Sonolus,
    keywords: string | undefined,
    page: number
): {
    pageCount: number
    infos: BackgroundInfo[]
} {
    return defaultListHandler(
        sonolus.db.backgrounds,
        ['name', 'title', 'subtitle', 'author', 'description'],
        keywords,
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
        req,
        res
    )
}
