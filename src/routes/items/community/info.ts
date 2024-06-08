import { ItemModel } from '../../../models'
import { ServerFormsModel } from '../../../models/forms/form'
import { ItemCommunityInfoModel, toItemCommunityInfo } from '../../../models/items/community/info'
import { SonolusItemGroup } from '../../../sonolus/itemGroup'
import { MaybePromise } from '../../../utils/promise'
import { SonolusRouteHandler } from '../../handler'

export type ItemCommunityInfoHandler<TCommunityActions extends ServerFormsModel> = (ctx: {
    session: string | undefined
    itemName: string
}) => MaybePromise<ItemCommunityInfoModel<TCommunityActions> | undefined>

export const defaultItemCommunityInfoHandler = (): undefined => undefined

export const createItemCommunityInfoRouteHandler =
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

        const info = await group.community.infoHandler({ session, itemName })
        if (!info) {
            res.status(404).end()
            return
        }

        res.json(toItemCommunityInfo(localize, info, group.community.actions))
    }
