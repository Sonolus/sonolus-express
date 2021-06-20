import { Request, Response } from 'express'
import { toSkinItem } from '../../../api/skin-item'
import { SkinInfo } from '../../../jtd/skin-info'
import { Sonolus } from '../../sonolus'
import { defaultListHandler, ListHandler, listRouteHandler } from '../list'

export type SkinListHandler = ListHandler<SkinInfo>

export function defaultSkinListHandler(
    sonolus: Sonolus,
    keywords: string | undefined,
    page: number
): {
    pageCount: number
    infos: SkinInfo[]
} {
    return defaultListHandler(
        sonolus.db.skins,
        ['name', 'title', 'subtitle', 'author', 'description'],
        keywords,
        page
    )
}

export function skinListRouteHandler(
    sonolus: Sonolus,
    req: Request,
    res: Response
): Promise<void> {
    return listRouteHandler(
        sonolus,
        sonolus.skinListHandler,
        toSkinItem,
        req,
        res
    )
}
