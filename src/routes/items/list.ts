import { ServerFormsModel, formTypes } from '../../models/forms/form'
import { ParsedSearchesQuery, parseSearchesQuery } from '../../models/forms/query'
import { ItemModel, ToItem } from '../../models/items/item'
import { ItemListModel, toItemList } from '../../models/items/list'
import { ServerOptionsModel } from '../../models/options/option'
import { SonolusBase } from '../../sonolus/base'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { MaybePromise } from '../../utils/promise'
import { SonolusCtx, SonolusRouteHandler } from '../handler'

export type ItemListHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TItemModel,
    TSearches extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        query: ParsedSearchesQuery<TSearches>
        page: number
    },
) => MaybePromise<ItemListModel<TItemModel, TSearches>>

export const createDefaultItemListHandler =
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
        filter: (items: TItemModel[], keywords: string) => TItemModel[],
    ): ItemListHandler<TConfigurationOptions, TItemModel, TSearches> =>
    ({ query, page }) => {
        const parsedQuery = parseSearchesQuery(query, {})
        const items = filter(group.items, parsedQuery.keywords)

        return {
            searches: formTypes(group.searches),
            ...paginateItems(items, page),
        }
    }

export const createItemListRouteHandler =
    <
        TConfigurationOptions extends ServerOptionsModel,
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        sonolus: SonolusBase,
        group: SonolusItemGroup<
            TConfigurationOptions,
            TItemModel,
            TCreates,
            TSearches,
            TCommunityActions
        >,
        toItem: ToItem<TItemModel, unknown>,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ req, res, localize, ctx }) => {
        res.json(
            toItemList(
                sonolus,
                localize,
                toItem,
                await group.listHandler({
                    ...ctx,
                    query: parseSearchesQuery(req.query, group.searches),
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
