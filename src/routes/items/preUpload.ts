import { ServerFormsModel } from '../../models/forms/form'
import { ItemModel } from '../../models/items/item'
import { ServerOptionsModel } from '../../models/options/option'
import { SonolusItemGroup } from '../../sonolus/itemGroup'
import { extractString } from '../../utils/extract'
import { MaybePromise } from '../../utils/promise'
import { SonolusCtx, SonolusRouteHandler } from '../handler'

export type ItemPreUploadHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        key: string
    },
) => MaybePromise<boolean>

export const defaultItemPreUploadHandler = (): boolean => false

export const createItemPreUploadRouteHandler =
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
        const key = extractString(req.headers['sonolus-upload-key'])
        if (key === undefined) {
            res.status(400).end()
            return
        }

        const response = await group.preUploadHandler({ ...ctx, key })
        if (!response) {
            res.status(400).end()
            return
        }

        next()
    }
