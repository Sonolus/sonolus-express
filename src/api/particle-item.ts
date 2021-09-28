import {
    Database,
    LocalizationText,
    ParticleInfo,
    ParticleItem,
} from 'sonolus-core'

export function toParticleItem(
    db: Database,
    localize: (text: LocalizationText) => string,
    info: ParticleInfo
): ParticleItem {
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
