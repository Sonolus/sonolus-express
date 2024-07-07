import { ServerCreateItemResponse } from '@sonolus/core'
import { ItemModel } from '../../models/items/item'
import { ServerFormsModel } from '../../models/server/forms/form'
import { ServerFormsValue, parseServerFormsValue } from '../../models/server/forms/value'
import { ServerOptionsModel } from '../../models/server/options/option'
import { serverCreateItemRequestSchema } from '../../schemas/server/items/create'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { parse } from '../../utils/json'
import { MaybePromise } from '../../utils/promise'
import { SonolusCtx } from '../ctx'
import { SonolusRouteHandler } from '../handler'

export type ServerCreateItemHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TCreates extends ServerFormsModel | undefined,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        value: ServerFormsValue<NonNullable<TCreates>>
    },
) => MaybePromise<ServerCreateItemResponse | undefined>

export const defaultServerCreateItemHandler = (): undefined => undefined

export const createServerCreateItemRouteHandler =
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

        const value = parseServerFormsValue(
            Object.fromEntries(new URLSearchParams(request.values)),
            group.creates,
        )
        if (!value) {
            res.status(400).end()
            return
        }

        const response = await group.createHandler({ ...ctx, value })
        if (!response) {
            res.status(404).end()
            return
        }

        res.json(response)
    }
