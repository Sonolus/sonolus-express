import { Request, Response } from 'express'
import { EngineInfo } from 'sonolus-core'
import { toEngineItem } from '../../../api/engine-item'
import { Sonolus } from '../../sonolus'
import { defaultListHandler, ListHandler, listRouteHandler } from '../list'

export type EngineListHandler<T> = ListHandler<T, EngineInfo>

export function defaultEngineListHandler(
    sonolus: Sonolus,
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

export function engineListRouteHandler(
    sonolus: Sonolus,
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
