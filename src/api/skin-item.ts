import { DB } from '../jtd/db'
import { LocalizationText } from '../jtd/localization-text'
import { SkinInfo } from '../jtd/skin-info'
import { SRL } from '../jtd/srl'

export type SkinItem = {
    name: string
    version: number
    title: string
    subtitle: string
    author: string
    thumbnail: SRL<'SkinThumbnail'>
    data: SRL<'SkinData'>
    texture: SRL<'SkinTexture'>
}

export function toSkinItem(
    db: DB,
    localize: (text: LocalizationText) => string,
    info: SkinInfo
): SkinItem {
    return {
        name: info.name,
        version: info.version,
        title: localize(info.title),
        subtitle: localize(info.subtitle),
        author: localize(info.author),
        thumbnail: info.thumbnail,
        data: info.data,
        texture: info.texture,
    }
}
