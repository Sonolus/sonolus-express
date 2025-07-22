import { ServerItemLeaderboardRecordList } from '@sonolus/core'
import { Localize } from '../../../../../utils/localization.js'
import { ServerItemLeaderboardRecordModel, toServerItemLeaderboardRecord } from './record.js'

export type ServerItemLeaderboardRecordListModel = {
    pageCount: number
    cursor?: string
    records: ServerItemLeaderboardRecordModel[]
}

export const toServerItemLeaderboardRecordList = (
    localize: Localize,
    list: ServerItemLeaderboardRecordListModel,
): ServerItemLeaderboardRecordList => ({
    pageCount: list.pageCount,
    cursor: list.cursor,
    records: list.records.map((record) => toServerItemLeaderboardRecord(localize, record)),
})
