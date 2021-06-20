import { Request, Response } from 'express'
import { toParticleItem } from '../../../api/particle-item'
import { ParticleInfo } from '../../../jtd/particle-info'
import { Sonolus } from '../../sonolus'
import { defaultListHandler, ListHandler, listRouteHandler } from '../list'

export type ParticleListHandler = ListHandler<ParticleInfo>

export function defaultParticleListHandler(
    sonolus: Sonolus,
    keywords: string | undefined,
    page: number
): {
    pageCount: number
    infos: ParticleInfo[]
} {
    return defaultListHandler(
        sonolus.db.particles,
        ['name', 'title', 'subtitle', 'author', 'description'],
        keywords,
        page
    )
}

export function particleListRouteHandler(
    sonolus: Sonolus,
    req: Request,
    res: Response
): Promise<void> {
    return listRouteHandler(
        sonolus,
        sonolus.particleListHandler,
        toParticleItem,
        req,
        res
    )
}
