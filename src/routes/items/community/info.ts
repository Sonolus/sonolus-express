import { ItemModel } from '../../../models/items/item.js'
import { ServerFormsModel } from '../../../models/server/forms/form.js'
import {
    ServerItemCommunityInfoModel,
    toServerItemCommunityInfo,
} from '../../../models/server/items/community/info.js'
import { ServerOptionsModel } from '../../../models/server/options/option.js'
import { SonolusItemGroup } from '../../../sonolus/itemGroup.js'
import { SonolusCtx } from '../../ctx.js'
import { handleError } from '../../error.js'
import { HandlerResponse, SonolusRouteHandler } from '../../handler.js'

export type ServerItemCommunityInfoHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TCommunityActions extends ServerFormsModel,
    TCommunityCommentActions extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
    },
) => HandlerResponse<
    ServerItemCommunityInfoModel<TCommunityActions, TCommunityCommentActions>,
    401 | 404
>

export const createServerItemCommunityInfoRouteHandler =
    <
        TConfigurationOptions extends ServerOptionsModel,
        TItemModel extends ItemModel,
        TCreates extends ServerFormsModel,
        TSearches extends ServerFormsModel,
        TActions extends ServerFormsModel,
        TCommunityActions extends ServerFormsModel,
        TCommunityCommentActions extends ServerFormsModel,
    >(
        group: SonolusItemGroup<
            TConfigurationOptions,
            TItemModel,
            TCreates,
            TSearches,
            TActions,
            TCommunityActions,
            TCommunityCommentActions
        >,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ req, res, localize, ctx }) => {
        if (!group.community.infoHandler) {
            res.status(404).end()
            return
        }

        const itemName = req.params.itemName
        if (!itemName) {
            res.status(400).end()
            return
        }

        const response = await group.community.infoHandler({ ...ctx, itemName })
        if (handleError(response, res, localize)) return

        res.json(
            toServerItemCommunityInfo(
                localize,
                response,
                group.community.actions,
                group.community.comment.actions,
            ),
        )
    }
