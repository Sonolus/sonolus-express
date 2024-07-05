import { ServerSubmitItemCommunityActionResponse } from '@sonolus/core'
import { ServerFormsModel } from '../../../../models/forms/form'
import { ParsedFormsQuery, parseFormsQuery } from '../../../../models/forms/query'
import { ItemModel } from '../../../../models/items/item'
import { ServerOptionsModel } from '../../../../models/options/option'
import { serverSubmitItemCommunityActionRequestSchema } from '../../../../schemas/server/items/community/submitItemCommunityActionRequest'
import { SonolusItemGroup } from '../../../../sonolus/itemGroup'
import { parse } from '../../../../utils/json'
import { MaybePromise } from '../../../../utils/promise'
import { SonolusCtx, SonolusRouteHandler } from '../../../handler'

export type ItemCommunityCommentSubmitHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TCommunityActions extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
        commentName: string
        query: ParsedFormsQuery<TCommunityActions>
    },
) => MaybePromise<ServerSubmitItemCommunityActionResponse | undefined>

export const defaultItemCommunityCommentSubmitHandler = (): undefined => undefined

export const createItemCommunityCommentSubmitRouteHandler =
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

        const query = parseFormsQuery(
            Object.fromEntries(new URLSearchParams(request.values)),
            group.community.actions,
        )
        if (!query) {
            res.status(400).end()
            return
        }

        const response = await group.community.comment.submitHandler({
            ...ctx,
            itemName,
            commentName,
            query,
        })
        if (!response) {
            res.status(404).end()
            return
        }

        res.json(response)
    }
