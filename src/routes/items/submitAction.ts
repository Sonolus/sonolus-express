import { ServerSubmitItemActionResponse } from '@sonolus/core'
import { ServerFormsModel } from '../../models/forms/form'
import { ParsedFormsQuery, parseFormsQuery } from '../../models/forms/query'
import { ItemModel } from '../../models/items/item'
import { ServerOptionsModel } from '../../models/options/option'
import { serverSubmitItemActionRequestSchema } from '../../schemas/server/items/submit'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { parse } from '../../utils/json'
import { MaybePromise } from '../../utils/promise'
import { SonolusCtx, SonolusRouteHandler } from '../handler'

export type ItemSubmitActionHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TActions extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
        values: ParsedFormsQuery<TActions>
    },
) => MaybePromise<ServerSubmitItemActionResponse | undefined>

export const defaultItemSubmitActionHandler = (): undefined => undefined

export const createItemSubmitActionRouteHandler =
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

        const request = parse(body, serverSubmitItemActionRequestSchema)
        if (!request) {
            res.status(400).end()
            return
        }

        const values = parseFormsQuery(
            Object.fromEntries(new URLSearchParams(request.values)),
            group.actions,
        )
        if (!values) {
            res.status(400).end()
            return
        }

        const response = await group.submitActionHandler({ ...ctx, itemName, values })
        if (!response) {
            res.status(404).end()
            return
        }

        res.json(response)
    }
