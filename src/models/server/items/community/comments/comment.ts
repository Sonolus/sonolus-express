import { LocalizationText, ServerItemCommunityComment } from '@sonolus/core'
import { Localize } from '../../../../../utils/localization'
import { PickForms, ServerFormsModel, toServerForms } from '../../../forms/form'

export type ServerItemCommunityCommentModel<T extends ServerFormsModel> = {
    name: string
    author: LocalizationText
    time: number
    content: LocalizationText
    actions: PickForms<T>
}

export const toServerItemCommunityComment = <T extends ServerFormsModel>(
    localize: Localize,
    comment: ServerItemCommunityCommentModel<T>,
    actions: T,
): ServerItemCommunityComment => ({
    name: comment.name,
    author: localize(comment.author),
    time: comment.time,
    content: localize(comment.content),
    actions: toServerForms(localize, comment.actions, actions),
})
