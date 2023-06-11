import { BackgroundInfo, BackgroundItem, Database, LocalizationText } from 'sonolus-core'

export function toBackgroundItem(
    db: Database,
    localize: (text: LocalizationText) => string,
    info: BackgroundInfo,
): BackgroundItem {
    return {
        name: info.name,
        version: info.version,
        title: localize(info.title),
        subtitle: localize(info.subtitle),
        author: localize(info.author),
        thumbnail: info.thumbnail,
        data: info.data,
        image: info.image,
        configuration: info.configuration,
    }
}
