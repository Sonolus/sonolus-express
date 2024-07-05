import { ServerCreateItemResponse } from '@sonolus/core'
import { ServerFormsModel } from '../../models/forms/form'
import { ParsedFormsQuery, parseFormsQuery } from '../../models/forms/query'
import { ItemModel } from '../../models/items/item'
import { ServerOptionsModel } from '../../models/options/option'
import { serverCreateItemRequestSchema } from '../../schemas/server/items/create'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { parse } from '../../utils/json'
import { MaybePromise } from '../../utils/promise'
import { SonolusCtx, SonolusRouteHandler } from '../handler'

export type ItemCreateHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TCreates extends ServerFormsModel | undefined,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        values: ParsedFormsQuery<NonNullable<TCreates>>
    },
) => MaybePromise<ServerCreateItemResponse | undefined>

export const defaultItemCreateHandler = (): undefined => undefined

export const createItemCreateRouteHandler =
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
    async ({ req, res, ctx }) => {
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

        const values = parseFormsQuery(
            Object.fromEntries(new URLSearchParams(request.values)),
            group.creates,
        )
        if (!values) {
            res.status(400).end()
            return
        }

        const response = await group.createHandler({ ...ctx, values })
        if (!response) {
            res.status(404).end()
            return
        }

        res.json(response)
    }
