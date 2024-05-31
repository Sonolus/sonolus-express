import { SonolusRouteHandler } from '../../sonolus'
import { itemCommunityCommentListRouteHandler } from '../item-community-comment-list'

export const levelCommunityCommentListRouteHandler: SonolusRouteHandler = (
    sonolus,
    session,
    req,
    res,
) => itemCommunityCommentListRouteHandler(sonolus, sonolus.levelConfig, session, req, res)
