import { SonolusRouteHandler } from '../../sonolus'
import { itemCommunityRouteHandler } from '../item-community'

export const particleCommunityRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemCommunityRouteHandler(sonolus, sonolus.particleConfig, session, req, res)
