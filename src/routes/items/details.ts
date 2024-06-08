import { Icon, Text } from '@sonolus/core'
import { ServerFormsModel } from '../../models/forms/form'
import { ItemDetailsModel, toItemDetails } from '../../models/items/details'
import { ItemModel, ToItem } from '../../models/items/item'
import { SonolusBase } from '../../sonolus/base'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { MaybePromise } from '../../utils/promise'
import { SonolusRouteHandler } from '../handler'

export type ItemDetailsHandler<TItemModel> = (ctx: {
    session: string | undefined
    itemName: string
}) => MaybePromise<ItemDetailsModel<TItemModel> | undefined>

export const createDefaultItemDetailsHandler =
    <
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        group: SonolusItemGroup<TItemModel, TCreates, TSearches, TCommunityActions>,
    ): ItemDetailsHandler<TItemModel> =>
    ({ itemName }) => {
        const item = group.items.find(({ name }) => name === itemName)
        if (!item) return undefined

        const index = group.items.indexOf(item)
        return {
            item,
            description: item.description,
            hasCommunity: false,
            leaderboards: [],
            sections: [
                {
                    title: { en: Text.Recommended },
                    icon: Icon.Star,
                    items: group.items.slice(index + 1, index + 6),
                },
            ],
        }
    }

export const createItemDetailsRouteHandler =
    <
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        sonolus: SonolusBase,
        group: SonolusItemGroup<TItemModel, TCreates, TSearches, TCommunityActions>,
        toItem: ToItem<TItemModel, unknown>,
    ): SonolusRouteHandler =>
    async ({ req, res, localize, session }) => {
        const itemName = req.params.itemName
        if (!itemName) {
            res.status(404).end()
            return
        }

        const details = await group.detailsHandler({ session, itemName })
        if (!details) {
            res.status(404).end()
            return
        }

        res.json(toItemDetails(sonolus, localize, toItem, details))
    }
