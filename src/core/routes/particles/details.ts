import { Request, Response } from 'express'
import { toParticleItem } from '../../../api/particle-item'
import { InfoDetails } from '../../../jtd/info-details'
import { ParticleInfo } from '../../../jtd/particle-info'
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
