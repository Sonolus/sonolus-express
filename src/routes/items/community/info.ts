import { ServerFormsModel } from '../../../models/forms/form'
import { ItemCommunityInfoModel, toItemCommunityInfo } from '../../../models/items/community/info'
import { ItemModel } from '../../../models/items/item'
import { ServerOptionsModel } from '../../../models/options/option'
import { SonolusItemGroup } from '../../../sonolus/itemGroup'
import { MaybePromise } from '../../../utils/promise'
import { SonolusCtx, SonolusRouteHandler } from '../../handler'

export type ItemCommunityInfoHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TCommunityActions extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
    },
) => MaybePromise<ItemCommunityInfoModel<TCommunityActions> | undefined>

export const defaultItemCommunityInfoHandler = (): undefined => undefined

export const createItemCommunityInfoRouteHandler =
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
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ req, res, localize, ctx }) => {
        const itemName = req.params.itemName
        if (!itemName) {
            res.status(404).end()
            return
        }

        const info = await group.community.infoHandler({ ...ctx, itemName })
        if (!info) {
            res.status(404).end()
            return
        }

        res.json(toItemCommunityInfo(localize, info, group.community.actions))
    }
