import { ItemModel } from '../../../../models/items/item'
import { ServerFormsModel } from '../../../../models/server/forms/form'
import {
    ServerItemLeaderboardRecordListModel,
    toServerItemLeaderboardRecordList,
} from '../../../../models/server/items/leaderboards/records/list'
import { ServerOptionsModel } from '../../../../models/server/options/option'
import { SonolusItemGroup } from '../../../../sonolus/itemGroup'
import { SonolusCtx } from '../../../ctx'
import { handleError } from '../../../error'
import { HandlerResponse, SonolusRouteHandler } from '../../../handler'

export type ServerItemLeaderboardRecordListHandler<
    TConfigurationOptions extends ServerOptionsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
        leaderboardName: string
        page: number
        cursor?: string
    },
) => HandlerResponse<ServerItemLeaderboardRecordListModel, 401 | 404>

export const createServerItemLeaderboardRecordListRouteHandler =
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
        if (!group.leaderboard.record.listHandler) {
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

        const response = await group.leaderboard.record.listHandler({
            ...ctx,
            itemName,
            leaderboardName,
            page: +(req.query.page ?? '') || 0,
            cursor: req.query.cursor && `${req.query.cursor as never}`,
        })
        if (handleError(response, res, localize)) return

        res.json(toServerItemLeaderboardRecordList(localize, response))
    }
