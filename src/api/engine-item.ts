import { Database, EngineInfo, EngineItem, LocalizationText } from 'sonolus-core'
import { toBackgroundItem, toEffectItem, toParticleItem, toSkinItem } from '.'
import { getByName } from '..'

export const toEngineItem = (
    db: Database,
    localize: (text: LocalizationText) => string,
    info: EngineInfo,
): EngineItem => ({
    name: info.name,
    version: info.version,
    title: localize(info.title),
    subtitle: localize(info.subtitle),
    author: localize(info.author),
    skin: toSkinItem(db, localize, getByName(db.skins, info.skin, `Engine/${info.name}`)),
    background: toBackgroundItem(
        db,
        localize,
        getByName(db.backgrounds, info.background, `Engine/${info.name}`),
    ),
    effect: toEffectItem(db, localize, getByName(db.effects, info.effect, `Engine/${info.name}`)),
    particle: toParticleItem(
        db,
        localize,
        getByName(db.particles, info.particle, `Engine/${info.name}`),
    ),
    thumbnail: info.thumbnail,
    playData: info.playData,
    previewData: info.previewData,
    tutorialData: info.tutorialData,
    rom: info.rom,
    configuration: info.configuration,
})
