import { ServerItemCommunityInfo } from '@sonolus/core'
import { Localize } from '../../../../utils/localization'
import { PickForms, ServerFormsModel, toServerForms } from '../../forms/form'
import { ServerItemCommunityCommentModel, toServerItemCommunityComment } from './comments/comment'

export type ServerItemCommunityInfoModel<T extends ServerFormsModel> = {
    actions: PickForms<T>
    topComments: ServerItemCommunityCommentModel<T>[]
}

export const toServerItemCommunityInfo = <T extends ServerFormsModel>(
    localize: Localize,
    info: ServerItemCommunityInfoModel<T>,
    actions: T,
): ServerItemCommunityInfo => ({
    actions: toServerForms(localize, info.actions, actions),
    topComments: info.topComments.map((comment) =>
        toServerItemCommunityComment(localize, comment, actions),
    ),
})
