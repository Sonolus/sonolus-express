import { DatabaseEngineItem, EngineItem } from '@sonolus/core'
import { toTags } from '../tag'
import { BackgroundItemModel, toBackgroundItem } from './background'
import { EffectItemModel, toEffectItem } from './effect'
import { Model, ToItem, getItem } from './item'
import { ParticleItemModel, toParticleItem } from './particle'
import { SkinItemModel, toSkinItem } from './skin'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface EngineItemModel
    extends Model<
        DatabaseEngineItem,
        {
            skin: string | SkinItemModel
            background: string | BackgroundItemModel
            effect: string | EffectItemModel
            particle: string | ParticleItemModel
        }
    > {}

export const toEngineItem: ToItem<EngineItemModel, EngineItem> = (sonolus, localize, item) => ({
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
        getItem(sonolus.skin.items, item.skin, `Engine/${item.name}`, '.skin'),
    ),
    background: toBackgroundItem(
        sonolus,
        localize,
        getItem(sonolus.background.items, item.background, `Engine/${item.name}`, '.background'),
    ),
    effect: toEffectItem(
        sonolus,
        localize,
        getItem(sonolus.effect.items, item.effect, `Engine/${item.name}`, '.effect'),
    ),
    particle: toParticleItem(
        sonolus,
        localize,
        getItem(sonolus.particle.items, item.particle, `Engine/${item.name}`, '.particle'),
    ),
    thumbnail: item.thumbnail,
    playData: item.playData,
    watchData: item.watchData,
    previewData: item.previewData,
    tutorialData: item.tutorialData,
    rom: item.rom,
    configuration: item.configuration,
})
