import { Request, Response } from 'express'
import { toEffectItem } from '../../../api/effect-item'
import { EffectInfo } from '../../../jtd/effect-info'
import { InfoDetails } from '../../../jtd/info-details'
import { Sonolus } from '../../sonolus'
import {
    defaultDetailsHandler,
    DetailsHandler,
    detailsRouteHandler,
} from '../details'

export type EffectDetailsHandler = DetailsHandler<EffectInfo>

export function defaultEffectDetailsHandler(
    sonolus: Sonolus,
    name: string
): InfoDetails<EffectInfo> | undefined {
    return defaultDetailsHandler(sonolus.db.effects, name)
}

export function effectDetailsRouteHandler(
    sonolus: Sonolus,
    req: Request,
    res: Response
): Promise<void> {
    return detailsRouteHandler(
        sonolus,
        sonolus.effectDetailsHandler,
        toEffectItem,
        req,
        res
    )
}
