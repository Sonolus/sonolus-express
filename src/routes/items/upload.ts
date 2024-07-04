import { ServerUploadItemResponse } from '@sonolus/core'
import { ServerFormsModel } from '../../models/forms/form'
import { ItemModel } from '../../models/items/item'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { extractString } from '../../utils/extract'
import { MaybePromise } from '../../utils/promise'
import { SonolusRouteHandler } from '../handler'

export type ItemUploadHandler = (ctx: {
    session: string | undefined
    key: string
    files: Express.Multer.File[]
}) => MaybePromise<ServerUploadItemResponse | undefined>

export const defaultItemUploadHandler = (): undefined => undefined

export const createItemUploadRouteHandler =
    <
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        group: SonolusItemGroup<TItemModel, TCreates, TSearches, TCommunityActions>,
    ): SonolusRouteHandler =>
    async ({ req, res, session }) => {
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

        const response = await group.uploadHandler({ session, key, files })
        if (!response) {
            res.status(400).end()
            return
        }

        res.json(response)
    }
