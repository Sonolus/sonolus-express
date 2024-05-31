import { ItemCommunity } from '@sonolus/core'
import { ServerFormsModel } from './form'
import { ItemCommunityAction, toServerForm } from './item-community-action'
import { ItemCommunityCommentModel, toItemCommunityComment } from './item-community-comment'
import { Localize } from './localization'

export type ItemCommunityModel<T extends ServerFormsModel | undefined> = {
    actions: ItemCommunityAction<T>[]
    topComments: ItemCommunityCommentModel<T>[]
}

export const toItemCommunity = <T extends ServerFormsModel>(
    localize: Localize,
    community: ItemCommunityModel<T>,
    actions: T,
): ItemCommunity => ({
    actions: community.actions.map((type) => toServerForm(localize, '', type, actions)),
    topComments: community.topComments.map((comment) =>
        toItemCommunityComment(localize, comment, actions),
    ),
})
