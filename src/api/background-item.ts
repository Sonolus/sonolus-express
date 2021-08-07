import { BackgroundInfo } from '../jtd/background-info'
import { DB } from '../jtd/db'
import { LocalizationText } from '../jtd/localization-text'
import { SRL } from '../jtd/srl'

export type BackgroundItem = {
    name: string
    version: number
    title: string
    subtitle: string
    author: string
    thumbnail: SRL<'BackgroundThumbnail'>
    data: SRL<'BackgroundData'>
    image: SRL<'BackgroundImage'>
    configuration: SRL<'BackgroundConfiguration'>
}

export function toBackgroundItem(
    db: DB,
    localize: (text: LocalizationText) => string,
    info: BackgroundInfo
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
