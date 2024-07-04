import { Text } from '@sonolus/core'
import { ServerFormsModel, formTypes } from '../../models/forms/form'
import { ItemInfoModel, toItemInfo } from '../../models/items/info'
import { ItemModel } from '../../models/items/item'
import { SonolusBase } from '../../sonolus/base'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { MaybePromise } from '../../utils/promise'
import { SonolusRouteHandler } from '../handler'

export type ItemInfoHandler<
    TCreates extends ServerFormsModel | undefined,
    TSearches extends ServerFormsModel,
> = (ctx: { session: string | undefined }) => MaybePromise<ItemInfoModel<TCreates, TSearches>>

export const createDefaultItemInfoHandler =
    <
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        sonolus: SonolusBase,
        group: SonolusItemGroup<TItemModel, TCreates, TSearches, TCommunityActions>,
    ): ItemInfoHandler<TCreates, TSearches> =>
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
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        sonolus: SonolusBase,
        group: SonolusItemGroup<TItemModel, TCreates, TSearches, TCommunityActions>,
    ): SonolusRouteHandler =>
    async ({ res, localize, session }) => {
        res.json(
            toItemInfo(
                sonolus,
                localize,
                await group.infoHandler({ session }),
                group.creates,
                group.searches,
            ),
        )
    }
