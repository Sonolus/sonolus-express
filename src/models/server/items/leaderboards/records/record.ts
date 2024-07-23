import { LocalizationText, ServerItemLeaderboardRecord } from '@sonolus/core'
import { Localize } from '../../../../../utils/localization'

export type ServerItemLeaderboardRecordModel = {
    name: string
    rank: LocalizationText
    player: string
    value: LocalizationText
}

export const toServerItemLeaderboardRecord = (
    localize: Localize,
    record: ServerItemLeaderboardRecordModel,
): ServerItemLeaderboardRecord => ({
    name: record.name,
    rank: localize(record.rank),
    player: record.player,
    value: localize(record.value),
})
