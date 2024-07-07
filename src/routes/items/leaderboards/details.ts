import { ItemModel } from '../../../models/items/item'
import { ServerFormsModel } from '../../../models/server/forms/form'
import {
    ServerItemLeaderboardDetailsModel,
    toServerItemLeaderboardDetails,
} from '../../../models/server/items/leaderboards/details'
import { ServerOptionsModel } from '../../../models/server/options/option'
import { SonolusItemGroup } from '../../../sonolus/itemGroup'
import { MaybePromise } from '../../../utils/promise'
import { SonolusCtx } from '../../ctx'
import { SonolusRouteHandler } from '../../handler'

export type ServerItemLeaderboardDetailsHandler<TConfigurationOptions extends ServerOptionsModel> =
    (
        ctx: SonolusCtx<TConfigurationOptions> & {
            itemName: string
            leaderboardName: string
        },
    ) => MaybePromise<ServerItemLeaderboardDetailsModel | undefined>

export const defaultServerItemLeaderboardDetailsHandler = (): undefined => undefined

export const createServerItemLeaderboardDetailsRouteHandler =
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

        res.json(toServerItemLeaderboardDetails(localize, details))
    }
