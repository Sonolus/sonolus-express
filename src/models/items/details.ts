import { LocalizationText, ServerItemDetails } from '@sonolus/core'
import { SonolusBase } from '../../sonolus/base'
import { Localize } from '../../utils/localization'
import { ServerFormsModel, toServerForms } from '../forms/form'
import { ToItem } from './item'
import { ItemLeaderboardModel, toItemLeaderboard } from './leaderboards/leaderboard'
import { ItemSectionModel, toItemSections } from './section'

export type ItemDetailsModel<TItemModel, TActions extends ServerFormsModel> = {
    item: TItemModel
    description?: LocalizationText
    actions: (keyof TActions & string)[]
    hasCommunity: boolean
    leaderboards: ItemLeaderboardModel[]
    sections: ItemSectionModel[]
}

export const toItemDetails = <TItemModel, TActions extends ServerFormsModel, TItem>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<TItemModel, TItem>,
    details: ItemDetailsModel<TItemModel, TActions>,
    actions: TActions,
): ServerItemDetails<TItem> => ({
    item: toItem(sonolus, localize, details.item),
    description: details.description && localize(details.description),
    actions: toServerForms(localize, details.actions, actions),
    hasCommunity: details.hasCommunity,
    leaderboards: details.leaderboards.map((leaderboard) =>
        toItemLeaderboard(localize, leaderboard),
    ),
    sections: toItemSections(sonolus, localize, details.sections),
})
