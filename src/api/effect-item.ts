import { DB } from '../jtd/db'
import { EffectInfo } from '../jtd/effect-info'
import { LocalizationText } from '../jtd/localization-text'
import { SRL } from '../jtd/srl'

export type EffectItem = {
    name: string
    version: number
    title: string
    subtitle: string
    author: string
    thumbnail: SRL<'EffectThumbnail'>
    data: SRL<'EffectData'>
}

export function toEffectItem(
    db: DB,
    localize: (text: LocalizationText) => string,
    info: EffectInfo
): EffectItem {
    return {
        name: info.name,
        version: info.version,
        title: localize(info.title),
        subtitle: localize(info.subtitle),
        author: localize(info.author),
        thumbnail: info.thumbnail,
        data: info.data,
    }
}
