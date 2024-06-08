import { ItemLeaderboard, LocalizationText } from '@sonolus/core'
import { Localize } from '../../../utils/localization'

export type ItemLeaderboardModel = {
    name: string
    title: LocalizationText
}

export const toItemLeaderboard = (
    localize: Localize,
    leaderboard: ItemLeaderboardModel,
): ItemLeaderboard => ({
    name: leaderboard.name,
    title: localize(leaderboard.title),
})
