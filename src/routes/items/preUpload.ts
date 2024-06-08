import { ServerFormsModel } from '../../models/forms/form'
import { ItemModel } from '../../models/items/item'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { extractString } from '../../utils/extract'
import { MaybePromise } from '../../utils/promise'
import { SonolusRouteHandler } from '../handler'

export type ItemPreUploadHandler = (ctx: {
    session: string | undefined
    key: string
}) => MaybePromise<boolean>

export const defaultItemPreUploadHandler = (): boolean => false

export const createItemPreUploadRouteHandler =
    <
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel | undefined,
        TSearches extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
    >(
        group: SonolusItemGroup<TItemModel, TCreates, TSearches, TCommunityActions>,
    ): SonolusRouteHandler =>
    async ({ req, res, next, session }) => {
        const key = extractString(req.headers['sonolus-upload-key'])
        if (key === undefined) {
            res.status(400).end()
            return
        }

        const response = await group.preUploadHandler({ session, key })
        if (!response) {
            res.status(400).end()
            return
        }

        next()
    }
