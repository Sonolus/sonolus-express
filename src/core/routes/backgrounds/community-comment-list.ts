import { SonolusRouteHandler } from '../../sonolus'
import { itemCommunityCommentListRouteHandler } from '../item-community-comment-list'

export const backgroundCommunityCommentListRouteHandler: SonolusRouteHandler = (
    sonolus,
    session,
    req,
    res,
) => itemCommunityCommentListRouteHandler(sonolus, sonolus.backgroundConfig, session, req, res)
