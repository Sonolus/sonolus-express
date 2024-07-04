import { ServerItemCommunityInfo } from '@sonolus/core'
import { Localize } from '../../../utils/localization'
import { ServerFormsModel, toServerForms } from '../../forms/form'
import { ItemCommunityCommentModel, toItemCommunityComment } from './comments/comment'

export type ItemCommunityInfoModel<T extends ServerFormsModel> = {
    actions: (keyof T & string)[]
    topComments: ItemCommunityCommentModel<T>[]
}

export const toItemCommunityInfo = <T extends ServerFormsModel>(
    localize: Localize,
    info: ItemCommunityInfoModel<T>,
    actions: T,
): ServerItemCommunityInfo => ({
    actions: toServerForms(localize, info.actions, actions),
    topComments: info.topComments.map((comment) =>
        toItemCommunityComment(localize, comment, actions),
    ),
})
