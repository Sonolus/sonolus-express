import { Database, LocalizationText, ReplayInfo, ReplayItem } from 'sonolus-core'
import { toLevelItem } from '.'
import { getByName } from '..'

export const toReplayItem = (
    db: Database,
    localize: (text: LocalizationText) => string,
    info: ReplayInfo,
): ReplayItem => ({
    name: info.name,
    version: info.version,
    title: localize(info.title),
    subtitle: localize(info.subtitle),
    author: localize(info.author),
    level: toLevelItem(db, localize, getByName(db.levels, info.level, `Replay/${info.name}`)),
    data: info.data,
    configuration: info.configuration,
})
