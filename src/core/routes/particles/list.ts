import { Request, Response } from 'express'
import { ParticleInfo } from 'sonolus-core'
import { toParticleItem } from '../../../api/particle-item'
import { Sonolus } from '../../sonolus'
import { defaultListHandler, ListHandler, listRouteHandler } from '../list'

export type ParticleListHandler<T> = ListHandler<T, ParticleInfo>

export function defaultParticleListHandler(
    sonolus: Sonolus,
    query: Record<string, unknown>,
    page: number
): {
    pageCount: number
    infos: ParticleInfo[]
} {
    return defaultListHandler(
        sonolus.db.particles,
        ['name', 'title', 'subtitle', 'author', 'description'],
        query,
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
        sonolus.particlesOption.search,
        req,
        res
    )
}
