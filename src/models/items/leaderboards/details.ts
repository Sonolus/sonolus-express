import { ServerItemLeaderboardDetails } from '@sonolus/core'
import { Localize } from '../../../utils/localization'
import { ItemLeaderboardRecordModel, toItemLeaderboardRecord } from './records/record'

export type ItemLeaderboardDetailsModel = {
    topRecords: ItemLeaderboardRecordModel[]
}

export const toItemLeaderboardDetails = (
    localize: Localize,
    details: ItemLeaderboardDetailsModel,
): ServerItemLeaderboardDetails => ({
    topRecords: details.topRecords.map((record) => toItemLeaderboardRecord(localize, record)),
})
