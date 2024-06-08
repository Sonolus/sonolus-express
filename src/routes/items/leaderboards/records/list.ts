import { ServerFormsModel } from '../../../../models/forms/form'
import { ItemModel } from '../../../../models/items/item'
import {
    ItemLeaderboardRecordListModel,
    toItemLeaderboardRecordList,
} from '../../../../models/items/leaderboards/records/list'
import { SonolusItemGroup } from '../../../../sonolus/itemGroup'
import { MaybePromise } from '../../../../utils/promise'
import { SonolusRouteHandler } from '../../../handler'

export type ItemLeaderboardRecordListHandler = (ctx: {
    session: string | undefined
    itemName: string
    leaderboardName: string
    page: number
}) => MaybePromise<ItemLeaderboardRecordListModel | undefined>

export const defaultItemLeaderboardRecordListHandler = (): undefined => undefined

export const createItemLeaderboardRecordListRouteHandler =
    <
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        group: SonolusItemGroup<TItemModel, TCreates, TSearches, TCommunityActions>,
    ): SonolusRouteHandler =>
    async ({ req, res, localize, session }) => {
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
            session,
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
