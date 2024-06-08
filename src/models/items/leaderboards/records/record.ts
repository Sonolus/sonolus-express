import { ItemLeaderboardRecord, LocalizationText } from '@sonolus/core'
import { Localize } from '../../../../utils/localization'

export type ItemLeaderboardRecordModel = {
    name: string
    rank: LocalizationText
    player: string
    value: LocalizationText
}

export const toItemLeaderboardRecord = (
    localize: Localize,
    record: ItemLeaderboardRecordModel,
): ItemLeaderboardRecord => ({
    name: record.name,
    rank: localize(record.rank),
    player: record.player,
    value: localize(record.value),
})
