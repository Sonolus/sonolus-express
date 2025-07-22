import { ServerItemLeaderboardRecordDetails } from '@sonolus/core'
import { SonolusBase } from '../../../../../sonolus/base.js'
import { Localize } from '../../../../../utils/localization.js'
import { ReplayItemModel, toReplayItem } from '../../../../items/replay.js'

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
