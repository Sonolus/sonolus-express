import { LocalizationText, ServerItemCommunityComment } from '@sonolus/core'
import { SonolusBase } from '../../../../../sonolus/base.js'
import { Localize } from '../../../../../utils/localization.js'
import { getItem } from '../../../../items/item.js'
import { UserItemModel, toUserItem } from '../../../../items/user.js'
import { PickForms, ServerFormsModel, toServerForms } from '../../../forms/form.js'

export type ServerItemCommunityCommentModel<T extends ServerFormsModel> = {
    name: string
    author: LocalizationText
    authorUser?: string | UserItemModel
    time: number
    content: LocalizationText
    actions: PickForms<T>
}

export const toServerItemCommunityComment = <T extends ServerFormsModel>(
    sonolus: SonolusBase,
    localize: Localize,
    comment: ServerItemCommunityCommentModel<T>,
    actions: T,
): ServerItemCommunityComment => ({
    name: comment.name,
    author: localize(comment.author),
    authorUser: comment.authorUser
        ? toUserItem(
              sonolus,
              localize,
              getItem(
                  sonolus.user.items,
                  comment.authorUser,
                  `Comment/${comment.name}`,
                  '.authorUser',
              ),
          )
        : undefined,
    time: comment.time,
    content: localize(comment.content),
    actions: toServerForms(localize, comment.actions, actions),
})
