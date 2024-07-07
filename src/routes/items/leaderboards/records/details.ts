import { ItemModel } from '../../../../models/items/item'
import { ServerFormsModel } from '../../../../models/server/forms/form'
import {
    ServerItemLeaderboardRecordDetailsModel,
    toServerItemLeaderboardRecordDetails,
} from '../../../../models/server/items/leaderboards/records/details'
import { ServerOptionsModel } from '../../../../models/server/options/option'
import { SonolusBase } from '../../../../sonolus/base'
import { SonolusItemGroup } from '../../../../sonolus/itemGroup'
import { MaybePromise } from '../../../../utils/promise'
import { SonolusCtx } from '../../../ctx'
import { SonolusRouteHandler } from '../../../handler'

export type ServerItemLeaderboardRecordDetailsHandler<
    TConfigurationOptions extends ServerOptionsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        session: string | undefined
        itemName: string
        leaderboardName: string
        recordName: string
    },
) => MaybePromise<ServerItemLeaderboardRecordDetailsModel | undefined>

export const defaultServerItemLeaderboardRecordDetailsHandler = (): undefined => undefined

export const createServerItemLeaderboardRecordDetailsRouteHandler =
    <
        TConfigurationOptions extends ServerOptionsModel,
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TActions extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        sonolus: SonolusBase,
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

        res.json(toServerItemLeaderboardRecordDetails(sonolus, localize, details))
    }
