import { Text } from '@sonolus/core'
import { ItemModel } from '../../models/items/item'
import { ServerFormsModel, formTypes } from '../../models/server/forms/form'
import { ServerItemInfoModel, toServerItemInfo } from '../../models/server/items/info'
import { ServerOptionsModel } from '../../models/server/options/option'
import { SonolusBase } from '../../sonolus/base'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { MaybePromise } from '../../utils/promise'
import { SonolusCtx } from '../ctx'
import { SonolusRouteHandler } from '../handler'

export type ServerItemInfoHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TCreates extends ServerFormsModel | undefined,
    TSearches extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions>,
) => MaybePromise<ServerItemInfoModel<TCreates, TSearches>>

export const createDefaultServerItemInfoHandler =
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
    ): ServerItemInfoHandler<TConfigurationOptions, TCreates, TSearches> =>
    () => ({
        creates: group.creates && formTypes(group.creates),
        searches: formTypes(group.searches),
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
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ res, localize, ctx }) => {
        res.json(
            toServerItemInfo(
                sonolus,
                localize,
                await group.infoHandler(ctx),
                group.creates,
                group.searches,
            ),
        )
    }
