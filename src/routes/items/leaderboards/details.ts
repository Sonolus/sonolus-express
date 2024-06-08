import { ServerFormsModel } from '../../../models/forms/form'
import { ItemModel } from '../../../models/items/item'
import {
    ItemLeaderboardDetailsModel,
    toItemLeaderboardDetails,
} from '../../../models/items/leaderboards/details'
import { SonolusItemGroup } from '../../../sonolus/itemGroup'
import { MaybePromise } from '../../../utils/promise'
import { SonolusRouteHandler } from '../../handler'

export type ItemLeaderboardDetailsHandler = (ctx: {
    session: string | undefined
    itemName: string
    leaderboardName: string
}) => MaybePromise<ItemLeaderboardDetailsModel | undefined>

export const defaultItemLeaderboardDetailsHandler = (): undefined => undefined

export const createItemLeaderboardDetailsRouteHandler =
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

        const details = await group.leaderboard.detailsHandler({
            session,
            itemName,
            leaderboardName,
        })
        if (!details) {
            res.status(404).end()
            return
        }

        res.json(toItemLeaderboardDetails(localize, details))
    }
