import { LocalizationText, ServerItemLeaderboard } from '@sonolus/core'
import { Localize } from '../../../../utils/localization'

export type ServerItemLeaderboardModel = {
    name: string
    title: LocalizationText
    description?: LocalizationText
}

export const toServerItemLeaderboard = (
    localize: Localize,
    leaderboard: ServerItemLeaderboardModel,
): ServerItemLeaderboard => ({
    name: leaderboard.name,
    title: localize(leaderboard.title),
    description: leaderboard.description && localize(leaderboard.description),
})
