import { ItemModel } from '../../models/items/item.js'
import { ServerFormsModel } from '../../models/server/forms/form.js'
import { ServerOptionsModel } from '../../models/server/options/option.js'
import { SonolusItemGroup } from '../../sonolus/itemGroup.js'
import { extractString } from '../../utils/extract.js'
import { SonolusCtx } from '../ctx.js'
import { handleError } from '../error.js'
import { HandlerResponse, SonolusRouteHandler } from '../handler.js'

export type ServerPreUploadItemActionHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
        key: string
    },
) => HandlerResponse<true, 400 | 401 | 404>

export const createServerPreUploadItemActionRouteHandler =
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
    async ({ req, res, next, localize, ctx }) => {
        if (!group.preUploadActionHandler) {
            res.status(404).end()
            return
        }

        const itemName = req.params.itemName
        if (!itemName) {
            res.status(400).end()
            return
        }

        const key = extractString(req.headers['sonolus-upload-key'])
        if (key === undefined) {
            res.status(400).end()
            return
        }

        const response = await group.preUploadActionHandler({ ...ctx, itemName, key })
        if (handleError(response, res, localize)) return

        next()
    }
