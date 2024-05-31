import { SonolusRouteHandler } from '../../sonolus'
import { itemCommunityRouteHandler } from '../item-community'

export const replayCommunityRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemCommunityRouteHandler(sonolus, sonolus.replayConfig, session, req, res)
