import { ServerSubmitItemActionResponse } from '@sonolus/core'
import { ItemModel } from '../../models/items/item.js'
import { ServerFormsModel } from '../../models/server/forms/form.js'
import { ServerFormsValue, parseServerFormsValue } from '../../models/server/forms/value.js'
import { ServerOptionsModel } from '../../models/server/options/option.js'
import { serverSubmitItemActionRequestSchema } from '../../schemas/server/items/submit.js'
import { SonolusItemGroup } from '../../sonolus/itemGroup.js'
import { parse } from '../../utils/json.js'
import { SonolusCtx } from '../ctx.js'
import { handleError } from '../error.js'
import { HandlerResponse, SonolusRouteHandler } from '../handler.js'

export type ServerSubmitItemActionHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TActions extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
        value: ServerFormsValue<TActions>
    },
) => HandlerResponse<ServerSubmitItemActionResponse, 400 | 401 | 404>

export const createServerSubmitItemActionRouteHandler =
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
    async ({ req, res, localize, ctx }) => {
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
        if (handleError(response, res, localize)) return

        res.json(response)
    }
