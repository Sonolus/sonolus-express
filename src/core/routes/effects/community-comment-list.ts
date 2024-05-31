import { SonolusRouteHandler } from '../../sonolus'
import { itemCommunityCommentListRouteHandler } from '../item-community-comment-list'

export const effectCommunityCommentListRouteHandler: SonolusRouteHandler = (
    sonolus,
    session,
    req,
    res,
) => itemCommunityCommentListRouteHandler(sonolus, sonolus.effectConfig, session, req, res)
