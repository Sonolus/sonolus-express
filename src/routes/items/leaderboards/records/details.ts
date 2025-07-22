import { ItemModel } from '../../../../models/items/item.js'
import { ServerFormsModel } from '../../../../models/server/forms/form.js'
import {
    ServerItemLeaderboardRecordDetailsModel,
    toServerItemLeaderboardRecordDetails,
} from '../../../../models/server/items/leaderboards/records/details.js'
import { ServerOptionsModel } from '../../../../models/server/options/option.js'
import { SonolusBase } from '../../../../sonolus/base.js'
import { SonolusItemGroup } from '../../../../sonolus/itemGroup.js'
import { SonolusCtx } from '../../../ctx.js'
import { handleError } from '../../../error.js'
import { HandlerResponse, SonolusRouteHandler } from '../../../handler.js'

export type ServerItemLeaderboardRecordDetailsHandler<
    TConfigurationOptions extends ServerOptionsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
        leaderboardName: string
        recordName: string
    },
) => HandlerResponse<ServerItemLeaderboardRecordDetailsModel, 401 | 404>

export const createServerItemLeaderboardRecordDetailsRouteHandler =
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
    async ({ req, res, localize, ctx }) => {
        if (!group.leaderboard.record.detailsHandler) {
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

        const recordName = req.params.recordName
        if (!recordName) {
            res.status(400).end()
            return
        }

        const response = await group.leaderboard.record.detailsHandler({
            ...ctx,
            itemName,
            leaderboardName,
            recordName,
        })
        if (handleError(response, res, localize)) return

        res.json(toServerItemLeaderboardRecordDetails(sonolus, localize, response))
    }
