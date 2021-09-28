import { Request, Response } from 'express'
import { BackgroundInfo, InfoDetails } from 'sonolus-core'
import { toBackgroundItem } from '../../../api/background-item'
import { Sonolus } from '../../sonolus'
import {
    defaultDetailsHandler,
    DetailsHandler,
    detailsRouteHandler,
} from '../details'

export type BackgroundDetailsHandler = DetailsHandler<BackgroundInfo>

export function defaultBackgroundDetailsHandler(
    sonolus: Sonolus,
    name: string
): InfoDetails<BackgroundInfo> | undefined {
    return defaultDetailsHandler(sonolus.db.backgrounds, name)
}

export function backgroundDetailsRouteHandler(
    sonolus: Sonolus,
    req: Request,
    res: Response
): Promise<void> {
    return detailsRouteHandler(
        sonolus,
        sonolus.backgroundDetailsHandler,
        toBackgroundItem,
        req,
        res
    )
}
