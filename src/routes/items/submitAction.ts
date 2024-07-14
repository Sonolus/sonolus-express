import { ServerSubmitItemActionResponse } from '@sonolus/core'
import { ItemModel } from '../../models/items/item'
import { ServerFormsModel } from '../../models/server/forms/form'
import { ServerFormsValue, parseServerFormsValue } from '../../models/server/forms/value'
import { ServerOptionsModel } from '../../models/server/options/option'
import { serverSubmitItemActionRequestSchema } from '../../schemas/server/items/submit'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { parse } from '../../utils/json'
import { MaybePromise } from '../../utils/promise'
import { SonolusCtx } from '../ctx'
import { SonolusRouteHandler } from '../handler'

export type ServerSubmitItemActionHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TActions extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
        value: ServerFormsValue<TActions>
    },
) => MaybePromise<ServerSubmitItemActionResponse | 400 | 401 | 404>

export const createServerSubmitItemActionRouteHandler =
    <
        TConfigurationOptions extends ServerOptionsModel,
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel,
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
        if (!group.submitActionHandler) {
            res.status(404).end()
            return
        }

        const itemName = req.params.itemName
        if (!itemName) {
            res.status(400).end()
            return
        }

        const body: unknown = req.body
        if (!(body instanceof Buffer)) {
            res.status(400).end()
            return
        }

        const request = parse(body, serverSubmitItemActionRequestSchema)
        if (!request) {
            res.status(400).end()
            return
        }

        const value = parseServerFormsValue(
            Object.fromEntries(new URLSearchParams(request.values)),
            group.actions,
        )
        if (!value) {
            res.status(400).end()
            return
        }

        const response = await group.submitActionHandler({ ...ctx, itemName, value })
        if (typeof response === 'number') {
            res.status(response).end()
            return
        }

        res.json(response)
    }
