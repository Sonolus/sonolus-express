import { ServerFormsModel } from '../../../models/forms/form'
import { ItemModel } from '../../../models/items/item'
import {
    ItemLeaderboardDetailsModel,
    toItemLeaderboardDetails,
} from '../../../models/items/leaderboards/details'
import { ServerOptionsModel } from '../../../models/options/option'
import { SonolusItemGroup } from '../../../sonolus/itemGroup'
import { MaybePromise } from '../../../utils/promise'
import { SonolusCtx, SonolusRouteHandler } from '../../handler'

export type ItemLeaderboardDetailsHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
        leaderboardName: string
    },
) => MaybePromise<ItemLeaderboardDetailsModel | undefined>

export const defaultItemLeaderboardDetailsHandler = (): undefined => undefined

export const createItemLeaderboardDetailsRouteHandler =
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

        const leaderboardName = req.params.leaderboardName
        if (!leaderboardName) {
            res.status(404).end()
            return
        }

        const details = await group.leaderboard.detailsHandler({
            ...ctx,
            itemName,
            leaderboardName,
        })
        if (!details) {
            res.status(404).end()
            return
        }

        res.json(toItemLeaderboardDetails(localize, details))
    }
