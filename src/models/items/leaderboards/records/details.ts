import { ServerItemLeaderboardRecordDetails } from '@sonolus/core'
import { SonolusBase } from '../../../../sonolus/base'
import { Localize } from '../../../../utils/localization'
import { ReplayItemModel, toReplayItem } from '../../replay'

export type ItemLeaderboardRecordDetailsModel = {
    replays: ReplayItemModel[]
}

export const toItemLeaderboardRecordDetails = (
    sonolus: SonolusBase,
    localize: Localize,
    details: ItemLeaderboardRecordDetailsModel,
): ServerItemLeaderboardRecordDetails => ({
    replays: details.replays.map((replay) => toReplayItem(sonolus, localize, replay)),
})
