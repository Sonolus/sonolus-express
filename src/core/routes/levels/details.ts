import { Request, Response } from 'express'
import { InfoDetails, LevelInfo } from 'sonolus-core'
import { toLevelItem } from '../../../api/level-item'
import { Sonolus } from '../../sonolus'
import {
    defaultDetailsHandler,
    DetailsHandler,
    detailsRouteHandler,
} from '../details'

export type LevelDetailsHandler = DetailsHandler<LevelInfo>

export function defaultLevelDetailsHandler(
    sonolus: Sonolus,
    name: string
): InfoDetails<LevelInfo> | undefined {
    return defaultDetailsHandler(sonolus.db.levels, name)
}

export function levelDetailsRouteHandler(
    sonolus: Sonolus,
    req: Request,
    res: Response
): Promise<void> {
    return detailsRouteHandler(
        sonolus,
        sonolus.levelDetailsHandler,
        toLevelItem,
        req,
        res
    )
}
