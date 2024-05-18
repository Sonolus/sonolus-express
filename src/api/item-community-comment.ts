import { ItemCommunityComment, LocalizationText } from '@sonolus/core'
import { ServerFormsModel } from './form'
import { toServerForm } from './item-community-action'
import { Localize } from './localization'

export type ItemCommunityCommentModel<T extends ServerFormsModel | undefined> = {
    id: string
    author: LocalizationText
    time: number
    content: LocalizationText
    actions: (keyof T)[]
}

export const toItemCommunityComment = <T extends ServerFormsModel>(
    localize: Localize,
    comment: ItemCommunityCommentModel<T>,
    actions: T,
): ItemCommunityComment => ({
    author: localize(comment.author),
    time: comment.time,
    content: localize(comment.content),
    actions: comment.actions.map((type) => toServerForm(localize, comment.id, type, actions)),
})
