import { ItemModel } from '../../../../models/items/item'
import { ServerFormsModel } from '../../../../models/server/forms/form'
import {
    ServerItemLeaderboardRecordListModel,
    toServerItemLeaderboardRecordList,
} from '../../../../models/server/items/leaderboards/records/list'
import { ServerOptionsModel } from '../../../../models/server/options/option'
import { SonolusItemGroup } from '../../../../sonolus/itemGroup'
import { MaybePromise } from '../../../../utils/promise'
import { SonolusCtx } from '../../../ctx'
import { SonolusRouteHandler } from '../../../handler'

export type ServerItemLeaderboardRecordListHandler<
    TConfigurationOptions extends ServerOptionsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
        leaderboardName: string
        page: number
    },
) => MaybePromise<ServerItemLeaderboardRecordListModel | undefined>

export const defaultServerItemLeaderboardRecordListHandler = (): undefined => undefined

export const createServerItemLeaderboardRecordListRouteHandler =
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

        const list = await group.leaderboard.record.listHandler({
            ...ctx,
            itemName,
            leaderboardName,
            page: +(req.query.page ?? '') || 0,
        })
        if (!list) {
            res.status(404).end()
            return
        }

        res.json(toServerItemLeaderboardRecordList(localize, list))
    }
