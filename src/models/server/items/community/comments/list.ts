import { ServerItemCommunityCommentList } from '@sonolus/core'
import { Localize } from '../../../../../utils/localization'
import { ServerFormsModel } from '../../../forms/form'
import { ServerItemCommunityCommentModel, toServerItemCommunityComment } from './comment'

export type ServerItemCommunityCommentListModel<T extends ServerFormsModel> = {
    pageCount: number
    comments: ServerItemCommunityCommentModel<T>[]
}

export const toServerItemCommunityCommentList = <T extends ServerFormsModel>(
    localize: Localize,
    list: ServerItemCommunityCommentListModel<T>,
    actions: T,
): ServerItemCommunityCommentList => ({
    pageCount: list.pageCount,
    comments: list.comments.map((comment) =>
        toServerItemCommunityComment(localize, comment, actions),
    ),
})
