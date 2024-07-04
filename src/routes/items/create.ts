import { ServerCreateItemResponse } from '@sonolus/core'
import { ServerFormsModel } from '../../models/forms/form'
import { ParsedQuery, parseQuery } from '../../models/forms/query'
import { ItemModel } from '../../models/items/item'
import { serverCreateItemRequestSchema } from '../../schemas/server/items/create'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { parse } from '../../utils/json'
import { MaybePromise } from '../../utils/promise'
import { SonolusRouteHandler } from '../handler'

export type ItemCreateHandler<TCreates extends ServerFormsModel | undefined> = (ctx: {
    session: string | undefined
    values: ParsedQuery<NonNullable<TCreates>>
}) => MaybePromise<ServerCreateItemResponse | undefined>

export const defaultItemCreateHandler = (): undefined => undefined

export const createItemCreateRouteHandler =
    <
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        group: SonolusItemGroup<TItemModel, TCreates, TSearches, TCommunityActions>,
    ): SonolusRouteHandler =>
    async ({ req, res, session }) => {
        if (!group.creates) {
            res.status(400).end()
            return
        }

        const body: unknown = req.body
        if (!(body instanceof Buffer)) {
            res.status(400).end()
            return
        }

        const request = parse(body, serverCreateItemRequestSchema)
        if (!request) {
            res.status(400).end()
            return
        }

        const values = parseQuery(
            Object.fromEntries(new URLSearchParams(request.values)),
            group.creates,
        )
        if (!values) {
            res.status(400).end()
            return
        }

        const response = await group.createHandler({ session, values })
        if (!response) {
            res.status(404).end()
            return
        }

        res.json(response)
    }
