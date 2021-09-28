import { Request, Response } from 'express'
import { InfoDetails, ParticleInfo } from 'sonolus-core'
import { toParticleItem } from '../../../api/particle-item'
import { Sonolus } from '../../sonolus'
import {
    defaultDetailsHandler,
    DetailsHandler,
    detailsRouteHandler,
} from '../details'

export type ParticleDetailsHandler = DetailsHandler<ParticleInfo>

export function defaultParticleDetailsHandler(
    sonolus: Sonolus,
    name: string
): InfoDetails<ParticleInfo> | undefined {
    return defaultDetailsHandler(sonolus.db.particles, name)
}

export function particleDetailsRouteHandler(
    sonolus: Sonolus,
    req: Request,
    res: Response
): Promise<void> {
    return detailsRouteHandler(
        sonolus,
        sonolus.particleDetailsHandler,
        toParticleItem,
        req,
        res
    )
}
