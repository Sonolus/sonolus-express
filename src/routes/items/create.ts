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
    TCreates extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        value: ServerFormsValue<TCreates>
    },
) => MaybePromise<ServerCreateItemResponse | 400 | 401>

export const createServerCreateItemRouteHandler =
    <
        TConfigurationOptions extends ServerOptionsModel,
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel,
        TSearches extends ServerFormsModel,
        TActions extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
        TCommunityCommentActions extends ServerFormsModel,
    >(
        group: SonolusItemGroup<
            TConfigurationOptions,
            TItemModel,
            TCreates,
            TSearches,
            TActions,
            TCommunityActions,
            TCommunityCommentActions
        >,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ req, res, ctx }) => {
        if (!group.createHandler) {
            res.status(404).end()
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
        if (typeof response === 'number') {
            res.status(response).end()
            return
        }

        res.json(response)
    }
