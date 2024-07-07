import { ItemModel, ToItem } from '../../models/items/item'
import { ServerFormsModel, formTypes } from '../../models/server/forms/form'
import { ServerSearchesValue, parseServerSearchesValue } from '../../models/server/forms/value'
import { ServerItemListModel, toServerItemList } from '../../models/server/items/list'
import { ServerOptionsModel } from '../../models/server/options/option'
import { SonolusBase } from '../../sonolus/base'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { MaybePromise } from '../../utils/promise'
import { SonolusCtx } from '../ctx'
import { SonolusRouteHandler } from '../handler'

export type ServerItemListHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TItemModel,
    TSearches extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        search: ServerSearchesValue<TSearches>
        page: number
    },
) => MaybePromise<ServerItemListModel<TItemModel, TSearches>>

export const createDefaultServerItemListHandler =
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
        filter: (items: TItemModel[], keywords: string) => TItemModel[],
    ): ServerItemListHandler<TConfigurationOptions, TItemModel, TSearches> =>
    ({ search, page }) => {
        const items = filter(group.items, (search as { keywords?: string }).keywords ?? '')

        return {
            searches: formTypes(group.searches),
            ...paginateItems(items, page),
        }
    }

export const createServerItemListRouteHandler =
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
        res.json(
            toServerItemList(
                sonolus,
                localize,
                toItem,
                await group.listHandler({
                    ...ctx,
                    search: parseServerSearchesValue(req.query, group.searches),
                    page: +(req.query.page ?? '') || 0,
                }),
                group.searches,
            ),
        )
    }

export const paginateItems = <T>(
    items: T[],
    page: number,
    perPage = 20,
): {
    pageCount: number
    items: T[]
} => ({
    pageCount: Math.ceil(items.length / perPage),
    items: items.slice(page * perPage, (page + 1) * perPage),
})
