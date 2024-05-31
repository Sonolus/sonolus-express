import { SonolusRouteHandler } from '../../sonolus'
import { itemCommunityCommentListRouteHandler } from '../item-community-comment-list'

export const postCommunityCommentListRouteHandler: SonolusRouteHandler = (
    sonolus,
    session,
    req,
    res,
) => itemCommunityCommentListRouteHandler(sonolus, sonolus.postConfig, session, req, res)
