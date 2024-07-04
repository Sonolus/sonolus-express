import { ServerSubmitItemActionResponse } from '@sonolus/core'
import { ServerFormsModel } from '../../../models/forms/form'
import { ParsedQuery, parseQuery } from '../../../models/forms/query'
import { ItemModel } from '../../../models/items/item'
import { serverSubmitItemCommunityActionRequestSchema } from '../../../schemas/server/items/community/submitItemCommunityActionRequest'
import { SonolusItemGroup } from '../../../sonolus/itemGroup'
import { parse } from '../../../utils/json'
import { MaybePromise } from '../../../utils/promise'
import { SonolusRouteHandler } from '../../handler'

export type ItemCommunitySubmitHandler<TCommunityActions extends ServerFormsModel> = (ctx: {
    session: string | undefined
    itemName: string
    query: ParsedQuery<TCommunityActions>
}) => MaybePromise<ServerSubmitItemActionResponse | undefined>

export const defaultItemCommunitySubmitHandler = (): undefined => undefined

export const createItemCommunitySubmitRouteHandler =
    <
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        group: SonolusItemGroup<TItemModel, TCreates, TSearches, TCommunityActions>,
    ): SonolusRouteHandler =>
    async ({ req, res, session }) => {
        const itemName = req.params.itemName
        if (!itemName) {
            res.status(404).end()
            return
        }

        const body: unknown = req.body
        if (!(body instanceof Buffer)) {
            res.status(400).end()
            return
        }

        const request = parse(body, serverSubmitItemCommunityActionRequestSchema)
        if (!request) {
            res.status(400).end()
            return
        }

        const query = parseQuery(
            Object.fromEntries(new URLSearchParams(request.values)),
            group.community.actions,
        )
        if (!query) {
            res.status(400).end()
            return
        }

        const response = await group.community.submitHandler({ session, itemName, query })
        if (!response) {
            res.status(404).end()
            return
        }

        res.json(response)
    }
