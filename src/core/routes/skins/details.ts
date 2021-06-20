import { Request, Response } from 'express'
import { toSkinItem } from '../../../api/skin-item'
import { InfoDetails } from '../../../jtd/info-details'
import { SkinInfo } from '../../../jtd/skin-info'
import { Sonolus } from '../../sonolus'
import {
    defaultDetailsHandler,
    DetailsHandler,
    detailsRouteHandler,
} from '../details'

export type SkinDetailsHandler = DetailsHandler<SkinInfo>

export function defaultSkinDetailsHandler(
    sonolus: Sonolus,
    name: string
): InfoDetails<SkinInfo> | undefined {
    return defaultDetailsHandler(sonolus.db.skins, name)
}

export function skinDetailsRouteHandler(
    sonolus: Sonolus,
    req: Request,
    res: Response
): Promise<void> {
    return detailsRouteHandler(
        sonolus,
        sonolus.skinDetailsHandler,
        toSkinItem,
        req,
        res
    )
}
