import { ServerSubmitItemCommunityCommentActionResponse } from '@sonolus/core'
import { ItemModel } from '../../../../models/items/item'
import { ServerFormsModel } from '../../../../models/server/forms/form'
import { ServerFormsValue, parseServerFormsValue } from '../../../../models/server/forms/value'
import { ServerOptionsModel } from '../../../../models/server/options/option'
import { serverSubmitItemCommunityActionRequestSchema } from '../../../../schemas/server/items/community/submitItemCommunityActionRequest'
import { SonolusItemGroup } from '../../../../sonolus/itemGroup'
import { parse } from '../../../../utils/json'
import { MaybePromise } from '../../../../utils/promise'
import { SonolusCtx } from '../../../ctx'
import { SonolusRouteHandler } from '../../../handler'

export type ServerSubmitItemCommunityCommentActionHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TCommunityActions extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
        commentName: string
        value: ServerFormsValue<TCommunityActions>
    },
) => MaybePromise<ServerSubmitItemCommunityCommentActionResponse | undefined>

export const defaultServerSubmitItemCommunityCommentActionHandler = (): undefined => undefined

export const createServerSubmitItemCommunityCommentActionRouteHandler =
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

        const commentName = req.params.commentName
        if (!commentName) {
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

        const value = parseServerFormsValue(
            Object.fromEntries(new URLSearchParams(request.values)),
            group.community.actions,
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
        if (!response) {
            res.status(404).end()
            return
        }

        res.json(response)
    }
