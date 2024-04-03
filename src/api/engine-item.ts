import { DatabaseEngineItem, EngineItem } from '@sonolus/core'
import { toBackgroundItem } from './background-item'
import { toEffectItem } from './effect-item'
import { ToItem, getByName } from './item'
import { toParticleItem } from './particle-item'
import { toSkinItem } from './skin-item'
import { toTags } from './tag'

export const toEngineItem: ToItem<DatabaseEngineItem, EngineItem> = (sonolus, localize, item) => ({
    name: item.name,
    source: sonolus.address,
    version: item.version,
    title: localize(item.title),
    subtitle: localize(item.subtitle),
    author: localize(item.author),
    tags: toTags(localize, item.tags),
    skin: toSkinItem(
        sonolus,
        localize,
        getByName(sonolus.db.skins, item.skin, `Engine/${item.name}`, '.skin'),
    ),
    background: toBackgroundItem(
        sonolus,
        localize,
        getByName(sonolus.db.backgrounds, item.background, `Engine/${item.name}`, '.background'),
    ),
    effect: toEffectItem(
        sonolus,
        localize,
        getByName(sonolus.db.effects, item.effect, `Engine/${item.name}`, '.effect'),
    ),
    particle: toParticleItem(
        sonolus,
        localize,
        getByName(sonolus.db.particles, item.particle, `Engine/${item.name}`, '.particle'),
    ),
    thumbnail: item.thumbnail,
    playData: item.playData,
    watchData: item.watchData,
    previewData: item.previewData,
    tutorialData: item.tutorialData,
    rom: item.rom,
    configuration: item.configuration,
})
