import { Request, Response } from 'express'
import { toBackgroundItem } from '../../../api/background-item'
import { BackgroundInfo } from '../../../jtd/background-info'
import { InfoDetails } from '../../../jtd/info-details'
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
