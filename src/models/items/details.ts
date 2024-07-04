import { LocalizationText, ServerItemDetails } from '@sonolus/core'
import { SonolusBase } from '../../sonolus/base'
import { Localize } from '../../utils/localization'
import { ToItem } from './item'
import { ItemLeaderboardModel, toItemLeaderboard } from './leaderboards/leaderboard'
import { ItemSectionModel, toItemSections } from './section'

export type ItemDetailsModel<T> = {
    item: T
    description?: LocalizationText
    hasCommunity: boolean
    leaderboards: ItemLeaderboardModel[]
    sections: ItemSectionModel<T>[]
}

export const toItemDetails = <TItemModel, TItem>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<TItemModel, TItem>,
    details: ItemDetailsModel<TItemModel>,
): ServerItemDetails<TItem> => ({
    item: toItem(sonolus, localize, details.item),
    description: details.description && localize(details.description),
    actions: [],
    hasCommunity: details.hasCommunity,
    leaderboards: details.leaderboards.map((leaderboard) =>
        toItemLeaderboard(localize, leaderboard),
    ),
    sections: toItemSections(sonolus, localize, toItem, details.sections),
})
