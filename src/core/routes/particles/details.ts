import { ParticleItemModel, toParticleItem } from '../../../api/particle-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemDetailsHandler,
    defaultItemDetailsHandler,
    itemDetailsRouteHandler,
} from '../item-details'

export const defaultParticleDetailsHandler: DefaultItemDetailsHandler<ParticleItemModel> = (
    sonolus,
    session,
    name,
) => defaultItemDetailsHandler(sonolus.db.particles, name)

export const particleDetailsRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemDetailsRouteHandler(sonolus, sonolus.particleConfig, toParticleItem, session, req, res)
