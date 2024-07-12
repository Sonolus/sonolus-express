import { LocalizationText, ServerItemDetails } from '@sonolus/core'
import { SonolusBase } from '../../../sonolus/base'
import { Localize } from '../../../utils/localization'
import { ToItem } from '../../items/item'
import { PickForms, ServerFormsModel, toServerForms } from '../../server/forms/form'
import { ServerItemSectionModel, toServerItemSections } from '../../server/items/section'
import { ServerItemLeaderboardModel, toServerItemLeaderboard } from './leaderboards/leaderboard'

export type ServerItemDetailsModel<
    TItemModel,
    TSearches extends ServerFormsModel,
    TActions extends ServerFormsModel,
> = {
    item: TItemModel
    description?: LocalizationText
    actions: PickForms<TActions>
    hasCommunity: boolean
    leaderboards: ServerItemLeaderboardModel[]
    sections: ServerItemSectionModel<TSearches>[]
}

export const toServerItemDetails = <
    TItemModel,
    TSearches extends ServerFormsModel,
    TActions extends ServerFormsModel,
    TItem,
>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<TItemModel, TItem>,
    details: ServerItemDetailsModel<TItemModel, TSearches, TActions>,
    searches: TSearches,
    actions: TActions,
): ServerItemDetails<TItem> => ({
    item: toItem(sonolus, localize, details.item),
    description: details.description && localize(details.description),
    actions: toServerForms(localize, details.actions, actions),
    hasCommunity: details.hasCommunity,
    leaderboards: details.leaderboards.map((leaderboard) =>
        toServerItemLeaderboard(localize, leaderboard),
    ),
    sections: toServerItemSections(sonolus, localize, details.sections, searches),
})
