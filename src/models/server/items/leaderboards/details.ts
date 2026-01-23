import { ServerItemLeaderboardDetails } from '@sonolus/core'
import { SonolusBase } from '../../../../sonolus/base.js'
import { Localize } from '../../../../utils/localization.js'
import {
    ServerItemLeaderboardRecordModel,
    toServerItemLeaderboardRecord,
} from './records/record.js'

export type ServerItemLeaderboardDetailsModel = {
    topRecords: ServerItemLeaderboardRecordModel[]
}

export const toServerItemLeaderboardDetails = (
    sonolus: SonolusBase,
    localize: Localize,
    details: ServerItemLeaderboardDetailsModel,
): ServerItemLeaderboardDetails => ({
    topRecords: details.topRecords.map((record) =>
        toServerItemLeaderboardRecord(sonolus, localize, record),
    ),
})
