import { Icon, Text } from '@sonolus/core'
import { ItemModel, ToItem } from '../../models/items/item'
import { ServerFormsModel } from '../../models/server/forms/form'
import { ServerItemDetailsModel, toServerItemDetails } from '../../models/server/items/details'
import { ServerOptionsModel } from '../../models/server/options/option'
import { SonolusBase } from '../../sonolus/base'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { SonolusCtx } from '../ctx'
import { handleError } from '../error'
import { HandlerResponse, SonolusRouteHandler } from '../handler'

export type ServerItemDetailsHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TSearches extends ServerFormsModel,
    TActions extends ServerFormsModel,
    TItemModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
    },
) => HandlerResponse<ServerItemDetailsModel<TItemModel, TSearches, TActions>, 401 | 404>

export const createDefaultServerItemDetailsHandler =
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
    ): ServerItemDetailsHandler<TConfigurationOptions, TSearches, TActions, TItemModel> =>
    ({ itemName }) => {
        const item = group.items.find(({ name }) => name === itemName)
        if (!item) return 404

        const index = group.items.indexOf(item)
        return {
            item,
            description: item.description,
            actions: group.actions,
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
        TCreates extends ServerFormsModel,
        TSearches extends ServerFormsModel,
        TActions extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
        TCommunityCommentActions extends ServerFormsModel,
    >(
        sonolus: SonolusBase,
        group: SonolusItemGroup<
            TConfigurationOptions,
            TItemModel,
            TCreates,
            TSearches,
            TActions,
            TCommunityActions,
            TCommunityCommentActions
        >,
        toItem: ToItem<TItemModel, unknown>,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ req, res, localize, ctx }) => {
        const itemName = req.params.itemName
        if (!itemName) {
            res.status(400).end()
            return
        }

        const response = await group.detailsHandler({ ...ctx, itemName })
        if (handleError(response, res, localize)) return

        res.json(
            toServerItemDetails(sonolus, localize, toItem, response, group.searches, group.actions),
        )
    }
