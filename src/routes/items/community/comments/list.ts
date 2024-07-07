import { ItemModel } from '../../../../models/items/item'
import { ServerFormsModel } from '../../../../models/server/forms/form'
import {
    ServerItemCommunityCommentListModel,
    toServerItemCommunityCommentList,
} from '../../../../models/server/items/community/comments/list'
import { ServerOptionsModel } from '../../../../models/server/options/option'
import { SonolusItemGroup } from '../../../../sonolus/itemGroup'
import { MaybePromise } from '../../../../utils/promise'
import { SonolusCtx } from '../../../ctx'
import { SonolusRouteHandler } from '../../../handler'

export type ServerItemCommunityCommentListHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TCommunityActions extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
        page: number
    },
) => MaybePromise<ServerItemCommunityCommentListModel<TCommunityActions> | undefined>

export const defaultServerItemCommunityCommentListHandler = (): undefined => undefined

export const createServerItemCommunityCommentListRouteHandler =
    <
        TConfigurationOptions extends ServerOptionsModel,
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TActions extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        group: SonolusItemGroup<
            TConfigurationOptions,
            TItemModel,
            TCreates,
            TSearches,
            TActions,
            TCommunityActions
        >,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ req, res, localize, ctx }) => {
        const itemName = req.params.itemName
        if (!itemName) {
            res.status(404).end()
            return
        }

        const list = await group.community.comment.listHandler({
            ...ctx,
            itemName,
            page: +(req.query.page ?? '') || 0,
        })
        if (!list) {
            res.status(404).end()
            return
        }

        res.json(toServerItemCommunityCommentList(localize, list, group.community.actions))
    }
