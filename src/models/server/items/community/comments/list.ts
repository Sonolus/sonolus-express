import { ServerItemCommunityCommentList } from '@sonolus/core'
import { Localize } from '../../../../../utils/localization.js'
import { ServerFormsModel } from '../../../forms/form.js'
import { ServerItemCommunityCommentModel, toServerItemCommunityComment } from './comment.js'

export type ServerItemCommunityCommentListModel<T extends ServerFormsModel> = {
    pageCount: number
    cursor?: string
    comments: ServerItemCommunityCommentModel<T>[]
}

export const toServerItemCommunityCommentList = <T extends ServerFormsModel>(
    localize: Localize,
    list: ServerItemCommunityCommentListModel<T>,
    actions: T,
): ServerItemCommunityCommentList => ({
    pageCount: list.pageCount,
    cursor: list.cursor,
    comments: list.comments.map((comment) =>
        toServerItemCommunityComment(localize, comment, actions),
    ),
})
