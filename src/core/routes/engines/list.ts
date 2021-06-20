import { Request, Response } from 'express'
import { toEngineItem } from '../../../api/engine-item'
import { EngineInfo } from '../../../jtd/engine-info'
import { Sonolus } from '../../sonolus'
import { defaultListHandler, ListHandler, listRouteHandler } from '../list'

export type EngineListHandler = ListHandler<EngineInfo>

export function defaultEngineListHandler(
    sonolus: Sonolus,
    keywords: string | undefined,
    page: number
): {
    pageCount: number
    infos: EngineInfo[]
} {
    return defaultListHandler(
        sonolus.db.engines,
        ['name', 'title', 'subtitle', 'author', 'description'],
        keywords,
        page
    )
}

export function engineListRouteHandler(
    sonolus: Sonolus,
    req: Request,
    res: Response
): Promise<void> {
    return listRouteHandler(
        sonolus,
        sonolus.engineListHandler,
        toEngineItem,
        req,
        res
    )
}
