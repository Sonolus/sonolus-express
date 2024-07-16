import { ServerItemCommunityInfo } from '@sonolus/core'
import { Localize } from '../../../../utils/localization'
import { PickForms, ServerFormsModel, toServerForms } from '../../forms/form'
import { ServerItemCommunityCommentModel, toServerItemCommunityComment } from './comments/comment'

export type ServerItemCommunityInfoModel<
    TCommunityActions extends ServerFormsModel,
    TCommunityCommentActions extends ServerFormsModel,
> = {
    actions: PickForms<TCommunityActions>
    topComments: ServerItemCommunityCommentModel<TCommunityCommentActions>[]
}

export const toServerItemCommunityInfo = <
    TCommunityActions extends ServerFormsModel,
    TCommunityCommentActions extends ServerFormsModel,
>(
    localize: Localize,
    info: ServerItemCommunityInfoModel<TCommunityActions, TCommunityCommentActions>,
    actions: TCommunityActions,
    commentActions: TCommunityCommentActions,
): ServerItemCommunityInfo => ({
    actions: toServerForms(localize, info.actions, actions),
    topComments: info.topComments.map((comment) =>
        toServerItemCommunityComment(localize, comment, commentActions),
    ),
})
