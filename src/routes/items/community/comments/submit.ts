import { SubmitItemCommunityActionResponse } from '@sonolus/core'
import { ServerFormsModel } from '../../../../models/forms/form'
import { ParsedQuery, parseQuery } from '../../../../models/forms/query'
import { ItemModel } from '../../../../models/items/item'
import { submitItemCommunityActionRequestSchema } from '../../../../schemas/server/submitItemCommunityActionRequest'
import { SonolusItemGroup } from '../../../../sonolus/itemGroup'
import { parse } from '../../../../utils/json'
import { MaybePromise } from '../../../../utils/promise'
import { SonolusRouteHandler } from '../../../handler'

export type ItemCommunityCommentSubmitHandler<TCommunityActions extends ServerFormsModel> = (ctx: {
    session: string | undefined
    itemName: string
    commentName: string
    query: ParsedQuery<TCommunityActions>
}) => MaybePromise<SubmitItemCommunityActionResponse | undefined>

export const defaultItemCommunityCommentSubmitHandler = (): undefined => undefined

export const createItemCommunityCommentSubmitRouteHandler =
    <
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        group: SonolusItemGroup<TItemModel, TCreates, TSearches, TCommunityActions>,
    ): SonolusRouteHandler =>
    async ({ req, res, session }) => {
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

        const request = parse(body, submitItemCommunityActionRequestSchema)
        if (!request) {
            res.status(400).end()
            return
        }

        const query = parseQuery(
            Object.fromEntries(new URLSearchParams(request.values)),
            group.community.actions,
        )
        if (!query) {
            res.status(400).end()
            return
        }

        const response = await group.community.comment.submitHandler({
            session,
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
