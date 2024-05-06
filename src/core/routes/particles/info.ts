import { ParticleItemModel, toParticleItem } from '../../../api/particle-item'
import { SonolusRouteHandler } from '../../sonolus'
import { DefaultItemInfoHandler, defaultItemInfoHandler, itemInfoRouteHandler } from '../item-info'

export const defaultParticleInfoHandler: DefaultItemInfoHandler<ParticleItemModel> = (sonolus) =>
    defaultItemInfoHandler(sonolus, sonolus.db.particles)

export const particleInfoRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemInfoRouteHandler(sonolus, sonolus.particleConfig, toParticleItem, session, req, res)
