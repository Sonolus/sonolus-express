import { DB, getByName } from '../jtd/db'
import { EngineInfo } from '../jtd/engine-info'
import { LocalizationText } from '../jtd/localization-text'
import { SRL } from '../jtd/srl'
import { BackgroundItem, toBackgroundItem } from './background-item'
import { EffectItem, toEffectItem } from './effect-item'
import { ParticleItem, toParticleItem } from './particle-item'
import { SkinItem, toSkinItem } from './skin-item'

export type EngineItem = {
    name: string
    version: number
    title: string
    subtitle: string
    author: string
    skin: SkinItem
    background: BackgroundItem
    effect: EffectItem
    particle: ParticleItem
    thumbnail: SRL<'EngineThumbnail'>
    data: SRL<'EngineData'>
    configuration: SRL<'EngineConfiguration'>
}

export function toEngineItem(
    db: DB,
    localize: (text: LocalizationText) => string,
    info: EngineInfo
): EngineItem {
    return {
        name: info.name,
        version: info.version,
        title: localize(info.title),
        subtitle: localize(info.subtitle),
        author: localize(info.author),
        skin: toSkinItem(
            db,
            localize,
            getByName(db.skins, info.skin, `Engine/${info.name}`)
        ),
        background: toBackgroundItem(
            db,
            localize,
            getByName(db.backgrounds, info.background, `Engine/${info.name}`)
        ),
        effect: toEffectItem(
            db,
            localize,
            getByName(db.effects, info.effect, `Engine/${info.name}`)
        ),
        particle: toParticleItem(
            db,
            localize,
            getByName(db.particles, info.particle, `Engine/${info.name}`)
        ),
        thumbnail: info.thumbnail,
        data: info.data,
        configuration: info.configuration,
    }
}
