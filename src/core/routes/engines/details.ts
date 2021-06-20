import { Request, Response } from 'express'
import { toEngineItem } from '../../../api/engine-item'
import { EngineInfo } from '../../../jtd/engine-info'
import { InfoDetails } from '../../../jtd/info-details'
import { Sonolus } from '../../sonolus'
import {
    defaultDetailsHandler,
    DetailsHandler,
    detailsRouteHandler,
} from '../details'

export type EngineDetailsHandler = DetailsHandler<EngineInfo>

export function defaultEngineDetailsHandler(
    sonolus: Sonolus,
    name: string
): InfoDetails<EngineInfo> | undefined {
    return defaultDetailsHandler(sonolus.db.engines, name)
}

export function engineDetailsRouteHandler(
    sonolus: Sonolus,
    req: Request,
    res: Response
): Promise<void> {
    return detailsRouteHandler(
        sonolus,
        sonolus.engineDetailsHandler,
        toEngineItem,
        req,
        res
    )
}
