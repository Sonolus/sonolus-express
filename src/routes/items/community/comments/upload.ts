import { ServerUploadItemCommunityCommentActionResponse } from '@sonolus/core'
import { ItemModel } from '../../../../models/items/item'
import { ServerFormsModel } from '../../../../models/server/forms/form'
import { ServerOptionsModel } from '../../../../models/server/options/option'
import { SonolusItemGroup } from '../../../../sonolus/itemGroup'
import { extractString } from '../../../../utils/extract'
import { MaybePromise } from '../../../../utils/promise'
import { SonolusCtx } from '../../../ctx'
import { SonolusRouteHandler } from '../../../handler'

export type ServerUploadItemCommunityCommentActionHandler<
    TConfigurationOptions extends ServerOptionsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
        commentName: string
        key: string
        files: Express.Multer.File[]
    },
) => MaybePromise<ServerUploadItemCommunityCommentActionResponse | 400 | 401 | 404>

export const createServerUploadItemCommunityCommentActionRouteHandler =
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
        if (!group.community.comment.uploadHandler) {
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

        const key = extractString(req.headers['sonolus-upload-key'])
        if (key === undefined) {
            res.status(400).end()
            return
        }

        const files = req.files
        if (!Array.isArray(files)) {
            res.status(400).end()
            return
        }

        const response = await group.community.comment.uploadHandler({
            ...ctx,
            itemName,
            commentName,
            key,
            files,
        })
        if (typeof response === 'number') {
            res.status(response).end()
            return
        }

        res.json(response)
    }
