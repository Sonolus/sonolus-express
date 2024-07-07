import { ServerItemLeaderboardDetails } from '@sonolus/core'
import { Localize } from '../../../../utils/localization'
import { ServerItemLeaderboardRecordModel, toServerItemLeaderboardRecord } from './records/record'

export type ServerItemLeaderboardDetailsModel = {
    topRecords: ServerItemLeaderboardRecordModel[]
}

export const toServerItemLeaderboardDetails = (
    localize: Localize,
    details: ServerItemLeaderboardDetailsModel,
): ServerItemLeaderboardDetails => ({
    topRecords: details.topRecords.map((record) => toServerItemLeaderboardRecord(localize, record)),
})
