import { ServerSubmitItemCommunityCommentActionResponse } from '@sonolus/core'
import { ItemModel } from '../../../../models/items/item'
import { ServerFormsModel } from '../../../../models/server/forms/form'
import { parseServerFormsValue, ServerFormsValue } from '../../../../models/server/forms/value'
import { ServerOptionsModel } from '../../../../models/server/options/option'
import { serverSubmitItemCommunityActionRequestSchema } from '../../../../schemas/server/items/community/submitItemCommunityActionRequest'
import { SonolusItemGroup } from '../../../../sonolus/itemGroup'
import { parse } from '../../../../utils/json'
import { SonolusCtx } from '../../../ctx'
import { handleError } from '../../../error'
import { HandlerResponse, SonolusRouteHandler } from '../../../handler'

export type ServerSubmitItemCommunityCommentActionHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TCommunityCommentActions extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
        commentName: string
        value: ServerFormsValue<TCommunityCommentActions>
    },
) => HandlerResponse<ServerSubmitItemCommunityCommentActionResponse, 400 | 401 | 404>

export const createServerSubmitItemCommunityCommentActionRouteHandler =
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
        if (!group.community.comment.submitHandler) {
            res.status(404).end()
            return
        }

        const itemName = req.params.itemName
        if (!itemName) {
            res.status(400).end()
            return
        }

        const commentName = req.params.commentName
        if (!commentName) {
            res.status(400).end()
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

        const value = parseServerFormsValue(
            Object.fromEntries(new URLSearchParams(request.values)),
            group.community.comment.actions,
        )
        if (!value) {
            res.status(400).end()
            return
        }

        const response = await group.community.comment.submitHandler({
            ...ctx,
            itemName,
            commentName,
            value,
        })
        if (handleError(response, res, localize)) return

        res.json(response)
    }
