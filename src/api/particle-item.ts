import { Database, LocalizationText, ParticleInfo, ParticleItem } from 'sonolus-core'

export const toParticleItem = (
    db: Database,
    localize: (text: LocalizationText) => string,
    info: ParticleInfo,
): ParticleItem => ({
    name: info.name,
    version: info.version,
    title: localize(info.title),
    subtitle: localize(info.subtitle),
    author: localize(info.author),
    thumbnail: info.thumbnail,
    data: info.data,
    texture: info.texture,
})
