import { SonolusRouteHandler } from '../../sonolus'
import { itemCommunityRouteHandler } from '../item-community'

export const backgroundCommunityRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemCommunityRouteHandler(sonolus, sonolus.backgroundConfig, session, req, res)
