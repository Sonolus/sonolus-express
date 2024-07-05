import { Text } from '@sonolus/core'
import { ServerFormsModel, formTypes } from '../../models/forms/form'
import { ItemInfoModel, toItemInfo } from '../../models/items/info'
import { ItemModel } from '../../models/items/item'
import { ServerOptionsModel } from '../../models/options/option'
import { SonolusBase } from '../../sonolus/base'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { MaybePromise } from '../../utils/promise'
import { SonolusCtx, SonolusRouteHandler } from '../handler'

export type ItemInfoHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TCreates extends ServerFormsModel | undefined,
    TSearches extends ServerFormsModel,
> = (ctx: SonolusCtx<TConfigurationOptions>) => MaybePromise<ItemInfoModel<TCreates, TSearches>>

export const createDefaultItemInfoHandler =
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
    ): ItemInfoHandler<TConfigurationOptions, TCreates, TSearches> =>
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

export const createItemInfoRouteHandler =
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
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ res, localize, ctx }) => {
        res.json(
            toItemInfo(
                sonolus,
                localize,
                await group.infoHandler(ctx),
                group.creates,
                group.searches,
            ),
        )
    }
