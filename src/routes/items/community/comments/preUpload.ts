import { ServerFormsModel } from '../../../../models/forms/form'
import { ItemModel } from '../../../../models/items/item'
import { ServerOptionsModel } from '../../../../models/options/option'
import { SonolusItemGroup } from '../../../../sonolus/itemGroup'
import { extractString } from '../../../../utils/extract'
import { MaybePromise } from '../../../../utils/promise'
import { SonolusCtx, SonolusRouteHandler } from '../../../handler'

export type ItemCommunityCommentPreUploadHandler<TConfigurationOptions extends ServerOptionsModel> =
    (
        ctx: SonolusCtx<TConfigurationOptions> & {
            itemName: string
            commentName: string
            key: string
        },
    ) => MaybePromise<boolean>

export const defaultItemCommunityCommentPreUploadHandler = (): boolean => false

export const createItemCommunityCommentPreUploadRouteHandler =
    <
        TConfigurationOptions extends ServerOptionsModel,
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        group: SonolusItemGroup<
            TConfigurationOptions,
            TItemModel,
            TCreates,
            TSearches,
            TCommunityActions
        >,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ req, res, next, ctx }) => {
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

        const key = extractString(req.headers['sonolus-upload-key'])
        if (key === undefined) {
            res.status(400).end()
            return
        }

        const response = await group.community.comment.preUploadHandler({
            ...ctx,
            itemName,
            commentName,
            key,
        })
        if (!response) {
            res.status(400).end()
            return
        }

        next()
    }
