import { Database, LocalizationText, SkinInfo, SkinItem } from 'sonolus-core'

export const toSkinItem = (
    db: Database,
    localize: (text: LocalizationText) => string,
    info: SkinInfo,
): SkinItem => ({
    name: info.name,
    version: info.version,
    title: localize(info.title),
    subtitle: localize(info.subtitle),
    author: localize(info.author),
    thumbnail: info.thumbnail,
    data: info.data,
    texture: info.texture,
})
