import { ItemModel } from '../../../models/items/item'
import { ServerFormsModel } from '../../../models/server/forms/form'
import {
    ServerItemLeaderboardDetailsModel,
    toServerItemLeaderboardDetails,
} from '../../../models/server/items/leaderboards/details'
import { ServerOptionsModel } from '../../../models/server/options/option'
import { SonolusItemGroup } from '../../../sonolus/itemGroup'
import { SonolusCtx } from '../../ctx'
import { handleError } from '../../error'
import { HandlerResponse, SonolusRouteHandler } from '../../handler'

export type ServerItemLeaderboardDetailsHandler<TConfigurationOptions extends ServerOptionsModel> =
    (
        ctx: SonolusCtx<TConfigurationOptions> & {
            itemName: string
            leaderboardName: string
        },
    ) => HandlerResponse<ServerItemLeaderboardDetailsModel, 401 | 404>

export const createServerItemLeaderboardDetailsRouteHandler =
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
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ req, res, localize, ctx }) => {
        if (!group.leaderboard.detailsHandler) {
            res.status(404).end()
            return
        }

        const itemName = req.params.itemName
        if (!itemName) {
            res.status(400).end()
            return
        }

        const leaderboardName = req.params.leaderboardName
        if (!leaderboardName) {
            res.status(400).end()
            return
        }

        const response = await group.leaderboard.detailsHandler({
            ...ctx,
            itemName,
            leaderboardName,
        })
        if (handleError(response, res, localize)) return

        res.json(toServerItemLeaderboardDetails(localize, response))
    }
