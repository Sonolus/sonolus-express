import { ItemModel, ToItem } from '../../models/items/item.js'
import { ServerFormsModel } from '../../models/server/forms/form.js'
import { ServerSearchesValue, parseServerSearchesValue } from '../../models/server/forms/value.js'
import { ServerItemListModel, toServerItemList } from '../../models/server/items/list.js'
import { ServerOptionsModel } from '../../models/server/options/option.js'
import { SonolusBase } from '../../sonolus/base.js'
import { SonolusItemGroup } from '../../sonolus/itemGroup.js'
import { SonolusCtx } from '../ctx.js'
import { handleError } from '../error.js'
import { HandlerResponse, SonolusRouteHandler } from '../handler.js'

export type ServerItemListHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TItemModel,
    TSearches extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        search: ServerSearchesValue<TSearches>
        page: number
        cursor?: string
    },
) => HandlerResponse<ServerItemListModel<TItemModel, TSearches>, 400 | 401>

export const createDefaultServerItemListHandler =
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
        filter: (items: TItemModel[], keywords: string) => TItemModel[],
    ): ServerItemListHandler<TConfigurationOptions, TItemModel, TSearches> =>
    ({ search, page }) => {
        const items = filter(
            group.items,
            search.type === 'quick' ? `${search.options.keywords}` : '',
        )

        return {
            searches: group.searches,
            ...paginateItems(items, page),
        }
    }

export const createServerItemListRouteHandler =
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
        const response = await group.listHandler({
            ...ctx,
            search: parseServerSearchesValue(req.query, group.searches),
            page: +(req.query.page ?? '') || 0,
            cursor: req.query.cursor && `${req.query.cursor as never}`,
        })
        if (handleError(response, res, localize)) return

        res.json(toServerItemList(sonolus, localize, toItem, response, group.searches))
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
