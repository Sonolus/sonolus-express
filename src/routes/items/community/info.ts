import { ItemModel } from '../../../models/items/item'
import { ServerFormsModel } from '../../../models/server/forms/form'
import {
    ServerItemCommunityInfoModel,
    toServerItemCommunityInfo,
} from '../../../models/server/items/community/info'
import { ServerOptionsModel } from '../../../models/server/options/option'
import { SonolusItemGroup } from '../../../sonolus/itemGroup'
import { MaybePromise } from '../../../utils/promise'
import { SonolusCtx } from '../../ctx'
import { SonolusRouteHandler } from '../../handler'

export type ServerItemCommunityInfoHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TCommunityActions extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
    },
) => MaybePromise<ServerItemCommunityInfoModel<TCommunityActions> | undefined>

export const defaultServerItemCommunityInfoHandler = (): undefined => undefined

export const createServerItemCommunityInfoRouteHandler =
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

        res.json(toServerItemCommunityInfo(localize, info, group.community.actions))
    }
