import { ServerFormsModel, formTypes } from '../../models/forms/form'
import { ParsedSearchQuery, parseSearchQuery } from '../../models/forms/query'
import { ItemModel, ToItem } from '../../models/items/item'
import { ItemListModel, toItemList } from '../../models/items/list'
import { SonolusBase } from '../../sonolus/base'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { MaybePromise } from '../../utils/promise'
import { SonolusRouteHandler } from '../handler'

export type ItemListHandler<TItemModel, TSearches extends ServerFormsModel> = (ctx: {
    session: string | undefined
    query: ParsedSearchQuery<TSearches>
    page: number
}) => MaybePromise<ItemListModel<TItemModel, TSearches>>

export const createDefaultItemListHandler =
    <
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        group: SonolusItemGroup<TItemModel, TCreates, TSearches, TCommunityActions>,
        filter: (items: TItemModel[], keywords: string) => TItemModel[],
    ): ItemListHandler<TItemModel, TSearches> =>
    ({ query, page }) => {
        const parsedQuery = parseSearchQuery(query, {})
        const items = filter(group.items, parsedQuery.keywords)

        return {
            searches: formTypes(group.searches),
            ...paginateItems(items, page),
        }
    }

export const createItemListRouteHandler =
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
        res.json(
            toItemList(
                sonolus,
                localize,
                toItem,
                await group.listHandler({
                    session,
                    query: parseSearchQuery(req.query, group.searches),
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
