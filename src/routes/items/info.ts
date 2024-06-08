import { Text } from '@sonolus/core'
import { ServerFormsModel, formTypes } from '../../models/forms/form'
import { ItemInfoModel, toItemInfo } from '../../models/items/info'
import { ItemModel, ToItem } from '../../models/items/item'
import { SonolusBase } from '../../sonolus/base'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { MaybePromise } from '../../utils/promise'
import { SonolusRouteHandler } from '../handler'

export type ItemInfoHandler<
    TItemModel,
    TCreates extends ServerFormsModel | undefined,
    TSearches extends ServerFormsModel,
> = (ctx: {
    session: string | undefined
}) => MaybePromise<ItemInfoModel<TItemModel, TCreates, TSearches>>

export const createDefaultItemInfoHandler =
    <
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        sonolus: SonolusBase,
        group: SonolusItemGroup<TItemModel, TCreates, TSearches, TCommunityActions>,
    ): ItemInfoHandler<TItemModel, TCreates, TSearches> =>
    () => ({
        creates: group.creates && formTypes(group.creates),
        searches: formTypes(group.searches),
        sections: [
            {
                title: { en: Text.Newest },
                items: group.items.slice(0, 5),
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
        toItem: ToItem<TItemModel, unknown>,
    ): SonolusRouteHandler =>
    async ({ res, localize, session }) => {
        res.json(
            toItemInfo(
                sonolus,
                localize,
                toItem,
                await group.infoHandler({ session }),
                group.creates,
                group.searches,
            ),
        )
    }
