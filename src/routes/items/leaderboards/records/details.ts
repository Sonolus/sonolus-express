import { ServerFormsModel } from '../../../../models/forms/form'
import { ItemModel } from '../../../../models/items/item'
import {
    ItemLeaderboardRecordDetailsModel,
    toItemLeaderboardRecordDetails,
} from '../../../../models/items/leaderboards/records/details'
import { ServerOptionsModel } from '../../../../models/options/option'
import { SonolusBase } from '../../../../sonolus/base'
import { SonolusItemGroup } from '../../../../sonolus/itemGroup'
import { MaybePromise } from '../../../../utils/promise'
import { SonolusCtx, SonolusRouteHandler } from '../../../handler'

export type ItemLeaderboardRecordDetailsHandler<TConfigurationOptions extends ServerOptionsModel> =
    (
        ctx: SonolusCtx<TConfigurationOptions> & {
            session: string | undefined
            itemName: string
            leaderboardName: string
            recordName: string
        },
    ) => MaybePromise<ItemLeaderboardRecordDetailsModel | undefined>

export const defaultItemLeaderboardRecordDetailsHandler = (): undefined => undefined

export const createItemLeaderboardRecordDetailsRouteHandler =
    <
        TConfigurationOptions extends ServerOptionsModel,
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        sonolus: SonolusBase,
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

        const leaderboardName = req.params.leaderboardName
        if (!leaderboardName) {
            res.status(404).end()
            return
        }

        const recordName = req.params.recordName
        if (!recordName) {
            res.status(404).end()
            return
        }

        const details = await group.leaderboard.record.detailsHandler({
            ...ctx,
            itemName,
            leaderboardName,
            recordName,
        })
        if (!details) {
            res.status(404).end()
            return
        }

        res.json(toItemLeaderboardRecordDetails(sonolus, localize, details))
    }
