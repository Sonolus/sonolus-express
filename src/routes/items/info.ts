import { Text } from '@sonolus/core'
import { ItemModel } from '../../models/items/item.js'
import { ServerFormsModel } from '../../models/server/forms/form.js'
import { ServerItemInfoModel, toServerItemInfo } from '../../models/server/items/info.js'
import { ServerOptionsModel } from '../../models/server/options/option.js'
import { SonolusBase } from '../../sonolus/base.js'
import { SonolusItemGroup } from '../../sonolus/itemGroup.js'
import { SonolusCtx } from '../ctx.js'
import { handleError } from '../error.js'
import { HandlerResponse, SonolusRouteHandler } from '../handler.js'

export type ServerItemInfoHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TCreates extends ServerFormsModel,
    TSearches extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions>,
) => HandlerResponse<ServerItemInfoModel<TCreates, TSearches>, 401>

export const createDefaultServerItemInfoHandler =
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
    ): ServerItemInfoHandler<TConfigurationOptions, TCreates, TSearches> =>
    () => ({
        creates: group.creates,
        searches: group.searches,
        sections: [
            {
                title: { en: Text.Newest },
                itemType: group.type,
                items: group.items.slice(0, 5) as never,
            },
        ],
        banner: sonolus.banner,
    })

export const createServerItemInfoRouteHandler =
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
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ res, localize, ctx }) => {
        const response = await group.infoHandler(ctx)
        if (handleError(response, res, localize)) return

        res.json(toServerItemInfo(sonolus, localize, response, group.creates, group.searches))
    }
