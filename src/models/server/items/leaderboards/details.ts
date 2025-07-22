import { ServerItemLeaderboardDetails } from '@sonolus/core'
import { Localize } from '../../../../utils/localization.js'
import {
    ServerItemLeaderboardRecordModel,
    toServerItemLeaderboardRecord,
} from './records/record.js'

export type ServerItemLeaderboardDetailsModel = {
    topRecords: ServerItemLeaderboardRecordModel[]
}

export const toServerItemLeaderboardDetails = (
    localize: Localize,
    details: ServerItemLeaderboardDetailsModel,
): ServerItemLeaderboardDetails => ({
    topRecords: details.topRecords.map((record) => toServerItemLeaderboardRecord(localize, record)),
})
