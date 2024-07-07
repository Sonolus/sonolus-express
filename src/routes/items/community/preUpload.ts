import { ItemModel } from '../../../models/items/item'
import { ServerFormsModel } from '../../../models/server/forms/form'
import { ServerOptionsModel } from '../../../models/server/options/option'
import { SonolusItemGroup } from '../../../sonolus/itemGroup'
import { extractString } from '../../../utils/extract'
import { MaybePromise } from '../../../utils/promise'
import { SonolusCtx } from '../../ctx'
import { SonolusRouteHandler } from '../../handler'

export type ServerPreUploadItemCommunityActionHandler<
    TConfigurationOptions extends ServerOptionsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
        key: string
    },
) => MaybePromise<boolean>

export const defaultServerPreUploadItemCommunityActionHandler = (): boolean => false

export const createServerPreUploadItemCommunityActionRouteHandler =
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
    async ({ req, res, next, ctx }) => {
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

        const response = await group.community.preUploadHandler({ ...ctx, itemName, key })
        if (!response) {
            res.status(400).end()
            return
        }

        next()
    }
