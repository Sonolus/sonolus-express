import { LocalizationText, ServerItemCommunityComment } from '@sonolus/core'
import { Localize } from '../../../../utils/localization'
import { ServerFormsModel, toServerForms } from '../../../forms/form'

export type ItemCommunityCommentModel<T extends ServerFormsModel> = {
    name: string
    author: LocalizationText
    time: number
    content: LocalizationText
    actions: (keyof T & string)[]
}

export const toItemCommunityComment = <T extends ServerFormsModel>(
    localize: Localize,
    comment: ItemCommunityCommentModel<T>,
    actions: T,
): ServerItemCommunityComment => ({
    name: comment.name,
    author: localize(comment.author),
    time: comment.time,
    content: localize(comment.content),
    actions: toServerForms(localize, comment.actions, actions),
})
