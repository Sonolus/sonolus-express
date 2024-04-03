import { DatabaseParticleItem } from '@sonolus/core'
import { toParticleItem } from '../../../api/particle-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemDetailsHandler,
    defaultItemDetailsHandler,
    itemDetailsRouteHandler,
} from '../item-details'

export const defaultParticleDetailsHandler: DefaultItemDetailsHandler<DatabaseParticleItem> = (
    sonolus,
    session,
    name,
) => defaultItemDetailsHandler(sonolus.db.particles, name)

export const particleDetailsRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemDetailsRouteHandler(sonolus, sonolus.particleConfig, toParticleItem, session, req, res)
