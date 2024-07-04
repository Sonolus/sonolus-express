import { LocalizationText, ServerItemLeaderboard } from '@sonolus/core'
import { Localize } from '../../../utils/localization'

export type ItemLeaderboardModel = {
    name: string
    title: LocalizationText
    description?: LocalizationText
}

export const toItemLeaderboard = (
    localize: Localize,
    leaderboard: ItemLeaderboardModel,
): ServerItemLeaderboard => ({
    name: leaderboard.name,
    title: localize(leaderboard.title),
    description: leaderboard.description && localize(leaderboard.description),
})
