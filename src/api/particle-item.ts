import { DB } from '../jtd/db'
import { LocalizationText } from '../jtd/localization-text'
import { ParticleInfo } from '../jtd/particle-info'
import { SRL } from '../jtd/srl'

export type ParticleItem = {
    name: string
    version: number
    title: string
    subtitle: string
    author: string
    thumbnail: SRL<'ParticleThumbnail'>
    data: SRL<'ParticleData'>
    texture: SRL<'ParticleTexture'>
}

export function toParticleItem(
    db: DB,
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
