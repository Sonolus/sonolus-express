import { ServerFormsModel } from '../../../../models/forms/form'
import {
    ItemCommunityCommentListModel,
    toItemCommunityCommentList,
} from '../../../../models/items/community/comments/list'
import { ItemModel } from '../../../../models/items/item'
import { ServerOptionsModel } from '../../../../models/options/option'
import { SonolusItemGroup } from '../../../../sonolus/itemGroup'
import { MaybePromise } from '../../../../utils/promise'
import { SonolusCtx, SonolusRouteHandler } from '../../../handler'

export type ItemCommunityCommentListHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TCommunityActions extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
        page: number
    },
) => MaybePromise<ItemCommunityCommentListModel<TCommunityActions> | undefined>

export const defaultItemCommunityCommentListHandler = (): undefined => undefined

export const createItemCommunityCommentListRouteHandler =
    <
        TConfigurationOptions extends ServerOptionsModel,
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        group: SonolusItemGroup<
            TConfigurationOptions,
            TItemModel,
            TCreates,
            TSearches,
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

        res.json(toItemCommunityCommentList(localize, list, group.community.actions))
    }
