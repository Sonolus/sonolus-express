import { ServerFormsModel } from '../../../../models/forms/form'
import {
    ItemCommunityCommentListModel,
    toItemCommunityCommentList,
} from '../../../../models/items/community/comments/list'
import { ItemModel } from '../../../../models/items/item'
import { SonolusItemGroup } from '../../../../sonolus/itemGroup'
import { MaybePromise } from '../../../../utils/promise'
import { SonolusRouteHandler } from '../../../handler'

export type ItemCommunityCommentListHandler<TCommunityActions extends ServerFormsModel> = (ctx: {
    session: string | undefined
    itemName: string
    page: number
}) => MaybePromise<ItemCommunityCommentListModel<TCommunityActions> | undefined>

export const defaultItemCommunityCommentListHandler = (): undefined => undefined

export const createItemCommunityCommentListRouteHandler =
    <
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        group: SonolusItemGroup<TItemModel, TCreates, TSearches, TCommunityActions>,
    ): SonolusRouteHandler =>
    async ({ req, res, localize, session }) => {
        const itemName = req.params.itemName
        if (!itemName) {
            res.status(404).end()
            return
        }

        const list = await group.community.comment.listHandler({
            session,
            itemName,
            page: +(req.query.page ?? '') || 0,
        })
        if (!list) {
            res.status(404).end()
            return
        }

        res.json(toItemCommunityCommentList(localize, list, group.community.actions))
    }
