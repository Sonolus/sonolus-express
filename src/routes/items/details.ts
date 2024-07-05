import { Icon, Text } from '@sonolus/core'
import { formTypes, ServerFormsModel } from '../../models/forms/form'
import { ItemDetailsModel, toItemDetails } from '../../models/items/details'
import { ItemModel, ToItem } from '../../models/items/item'
import { ServerOptionsModel } from '../../models/options/option'
import { SonolusBase } from '../../sonolus/base'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { MaybePromise } from '../../utils/promise'
import { SonolusCtx, SonolusRouteHandler } from '../handler'

export type ItemDetailsHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TActions extends ServerFormsModel,
    TItemModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
    },
) => MaybePromise<ItemDetailsModel<TItemModel, TActions> | undefined>

export const createDefaultItemDetailsHandler =
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
    ): ItemDetailsHandler<TConfigurationOptions, TActions, TItemModel> =>
    ({ itemName }) => {
        const item = group.items.find(({ name }) => name === itemName)
        if (!item) return undefined

        const index = group.items.indexOf(item)
        return {
            item,
            description: item.description,
            actions: formTypes(group.actions),
            hasCommunity: false,
            leaderboards: [],
            sections: [
                {
                    title: { en: Text.Recommended },
                    icon: Icon.Star,
                    itemType: group.type,
                    items: group.items.slice(index + 1, index + 6) as never,
                },
            ],
        }
    }

export const createItemDetailsRouteHandler =
    <
        TConfigurationOptions extends ServerOptionsModel,
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TActions extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        sonolus: SonolusBase,
        group: SonolusItemGroup<
            TConfigurationOptions,
            TItemModel,
            TCreates,
            TSearches,
            TActions,
            TCommunityActions
        >,
        toItem: ToItem<TItemModel, unknown>,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ req, res, localize, ctx }) => {
        const itemName = req.params.itemName
        if (!itemName) {
            res.status(404).end()
            return
        }

        const details = await group.detailsHandler({ ...ctx, itemName })
        if (!details) {
            res.status(404).end()
            return
        }

        res.json(toItemDetails(sonolus, localize, toItem, details, group.actions))
    }
