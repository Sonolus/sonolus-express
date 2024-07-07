import { Icon, Text } from '@sonolus/core'
import { ItemModel, ToItem } from '../../models/items/item'
import { formTypes, ServerFormsModel } from '../../models/server/forms/form'
import { ServerItemDetailsModel, toServerItemDetails } from '../../models/server/items/details'
import { ServerOptionsModel } from '../../models/server/options/option'
import { SonolusBase } from '../../sonolus/base'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { MaybePromise } from '../../utils/promise'
import { SonolusCtx } from '../ctx'
import { SonolusRouteHandler } from '../handler'

export type ServerItemDetailsHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TSearches extends ServerFormsModel,
    TActions extends ServerFormsModel,
    TItemModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
    },
) => MaybePromise<ServerItemDetailsModel<TItemModel, TSearches, TActions> | undefined>

export const createDefaultServerItemDetailsHandler =
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
    ): ServerItemDetailsHandler<TConfigurationOptions, TSearches, TActions, TItemModel> =>
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

export const createServerItemDetailsRouteHandler =
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

        res.json(
            toServerItemDetails(sonolus, localize, toItem, details, group.searches, group.actions),
        )
    }
