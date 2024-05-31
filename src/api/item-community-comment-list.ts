import { ItemCommunityCommentList } from '@sonolus/core'
import { ServerFormsModel } from './form'
import { ItemCommunityCommentModel, toItemCommunityComment } from './item-community-comment'
import { Localize } from './localization'

export type ItemCommunityCommentListModel<T extends ServerFormsModel | undefined> = {
    pageCount: number
    comments: ItemCommunityCommentModel<T>[]
}

export const toItemCommunityCommentList = <T extends ServerFormsModel>(
    localize: Localize,
    list: ItemCommunityCommentListModel<T>,
    actions: T,
): ItemCommunityCommentList => ({
    pageCount: list.pageCount,
    comments: list.comments.map((comment) => toItemCommunityComment(localize, comment, actions)),
})
