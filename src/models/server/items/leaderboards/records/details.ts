import { ServerItemLeaderboardRecordDetails } from '@sonolus/core'
import { SonolusBase } from '../../../../../sonolus/base'
import { Localize } from '../../../../../utils/localization'
import { ReplayItemModel, toReplayItem } from '../../../../items/replay'

export type ServerItemLeaderboardRecordDetailsModel = {
    replays: ReplayItemModel[]
}

export const toServerItemLeaderboardRecordDetails = (
    sonolus: SonolusBase,
    localize: Localize,
    details: ServerItemLeaderboardRecordDetailsModel,
): ServerItemLeaderboardRecordDetails => ({
    replays: details.replays.map((replay) => toReplayItem(sonolus, localize, replay)),
})
