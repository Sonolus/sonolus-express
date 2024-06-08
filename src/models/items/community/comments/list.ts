import { ItemCommunityCommentList } from '@sonolus/core'
import { Localize } from '../../../../utils/localization'
import { ServerFormsModel } from '../../../forms/form'
import { ItemCommunityCommentModel, toItemCommunityComment } from './comment'

export type ItemCommunityCommentListModel<T extends ServerFormsModel> = {
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
