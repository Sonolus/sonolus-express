import { ItemModel } from '../../../../models/items/item'
import { ServerFormsModel } from '../../../../models/server/forms/form'
import {
    ServerItemCommunityCommentListModel,
    toServerItemCommunityCommentList,
} from '../../../../models/server/items/community/comments/list'
import { ServerOptionsModel } from '../../../../models/server/options/option'
import { SonolusItemGroup } from '../../../../sonolus/itemGroup'
import { SonolusCtx } from '../../../ctx'
import { handleError } from '../../../error'
import { HandlerResponse, SonolusRouteHandler } from '../../../handler'

export type ServerItemCommunityCommentListHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TCommunityCommentActions extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
        page: number
        cursor?: string
    },
) => HandlerResponse<ServerItemCommunityCommentListModel<TCommunityCommentActions>, 401 | 404>

export const createServerItemCommunityCommentListRouteHandler =
    <
        TConfigurationOptions extends ServerOptionsModel,
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel,
        TSearches extends ServerFormsModel,
        TActions extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
        TCommunityCommentActions extends ServerFormsModel,
    >(
        group: SonolusItemGroup<
            TConfigurationOptions,
            TItemModel,
            TCreates,
            TSearches,
            TActions,
            TCommunityActions,
            TCommunityCommentActions
        >,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ req, res, localize, ctx }) => {
        if (!group.community.comment.listHandler) {
            res.status(404).end()
            return
        }

        const itemName = req.params.itemName
        if (!itemName) {
            res.status(400).end()
            return
        }

        const response = await group.community.comment.listHandler({
            ...ctx,
            itemName,
            page: +(req.query.page ?? '') || 0,
            cursor: req.query.cursor && `${req.query.cursor as never}`,
        })
        if (handleError(response, res, localize)) return

        res.json(
            toServerItemCommunityCommentList(localize, response, group.community.comment.actions),
        )
    }
