import { ServerFormsModel } from '../../../../models/forms/form'
import { ItemModel } from '../../../../models/items/item'
import {
    ItemLeaderboardRecordListModel,
    toItemLeaderboardRecordList,
} from '../../../../models/items/leaderboards/records/list'
import { ServerOptionsModel } from '../../../../models/options/option'
import { SonolusItemGroup } from '../../../../sonolus/itemGroup'
import { MaybePromise } from '../../../../utils/promise'
import { SonolusCtx, SonolusRouteHandler } from '../../../handler'

export type ItemLeaderboardRecordListHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
        leaderboardName: string
        page: number
    },
) => MaybePromise<ItemLeaderboardRecordListModel | undefined>

export const defaultItemLeaderboardRecordListHandler = (): undefined => undefined

export const createItemLeaderboardRecordListRouteHandler =
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

        res.json(toItemLeaderboardRecordList(localize, list))
    }
