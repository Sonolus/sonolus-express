import { ServerUploadItemCommunityActionResponse } from '@sonolus/core'
import { ServerFormsModel } from '../../../models/forms/form'
import { ItemModel } from '../../../models/items/item'
import { ServerOptionsModel } from '../../../models/options/option'
import { SonolusItemGroup } from '../../../sonolus/itemGroup'
import { extractString } from '../../../utils/extract'
import { MaybePromise } from '../../../utils/promise'
import { SonolusCtx, SonolusRouteHandler } from '../../handler'

export type ItemCommunityUploadHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
        key: string
        files: Express.Multer.File[]
    },
) => MaybePromise<ServerUploadItemCommunityActionResponse | undefined>

export const defaultItemCommunityUploadHandler = (): undefined => undefined

export const createItemCommunityUploadRouteHandler =
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
    async ({ req, res, ctx }) => {
        const itemName = req.params.itemName
        if (!itemName) {
            res.status(404).end()
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

        const response = await group.community.uploadHandler({ ...ctx, itemName, key, files })
        if (!response) {
            res.status(400).end()
            return
        }

        res.json(response)
    }
