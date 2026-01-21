import { LocalizationText, ServerItemLeaderboardRecord } from '@sonolus/core'
import { SonolusBase } from '../../../../../sonolus/base.js'
import { Localize } from '../../../../../utils/localization.js'
import { getItem } from '../../../../items/item.js'
import { UserItemModel, toUserItem } from '../../../../items/user.js'

export type ServerItemLeaderboardRecordModel = {
    name: string
    rank: LocalizationText
    player: string
    playerUser?: string | UserItemModel
    value: LocalizationText
}

export const toServerItemLeaderboardRecord = (
    sonolus: SonolusBase,
    localize: Localize,
    record: ServerItemLeaderboardRecordModel,
): ServerItemLeaderboardRecord => ({
    name: record.name,
    rank: localize(record.rank),
    player: record.player,
    playerUser: record.playerUser
        ? toUserItem(
              sonolus,
              localize,
              getItem(
                  sonolus.user.items,
                  record.playerUser,
                  `Record/${record.name}`,
                  '.playerUser',
              ),
          )
        : undefined,
    value: localize(record.value),
})
