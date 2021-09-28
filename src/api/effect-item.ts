import {
    Database,
    EffectInfo,
    EffectItem,
    LocalizationText,
} from 'sonolus-core'

export function toEffectItem(
    db: Database,
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
