import { ServerUploadItemResponse } from '@sonolus/core'
import { ItemModel } from '../../models/items/item'
import { ServerFormsModel } from '../../models/server/forms/form'
import { ServerOptionsModel } from '../../models/server/options/option'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { extractString } from '../../utils/extract'
import { MaybePromise } from '../../utils/promise'
import { SonolusCtx } from '../ctx'
import { SonolusRouteHandler } from '../handler'

export type ServerUploadItemHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        key: string
        files: Express.Multer.File[]
    },
) => MaybePromise<ServerUploadItemResponse | undefined>

export const defaultServerUploadServerHandler = (): undefined => undefined

export const createServerUploadItemRouteHandler =
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

        const response = await group.uploadHandler({ ...ctx, key, files })
        if (!response) {
            res.status(400).end()
            return
        }

        res.json(response)
    }
