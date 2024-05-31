import { SonolusRouteHandler } from '../../sonolus'
import { itemCommunityRouteHandler } from '../item-community'

export const postCommunityRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemCommunityRouteHandler(sonolus, sonolus.postConfig, session, req, res)
