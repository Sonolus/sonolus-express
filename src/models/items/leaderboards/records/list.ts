import { ServerItemLeaderboardRecordList } from '@sonolus/core'
import { Localize } from '../../../../utils/localization'
import { ItemLeaderboardRecordModel, toItemLeaderboardRecord } from './record'

export type ItemLeaderboardRecordListModel = {
    pageCount: number
    records: ItemLeaderboardRecordModel[]
}

export const toItemLeaderboardRecordList = (
    localize: Localize,
    list: ItemLeaderboardRecordListModel,
): ServerItemLeaderboardRecordList => ({
    pageCount: list.pageCount,
    records: list.records.map((record) => toItemLeaderboardRecord(localize, record)),
})
