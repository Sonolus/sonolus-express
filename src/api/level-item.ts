import { DatabaseLevelItem, LevelItem, UseItem } from '@sonolus/core'
import { SonolusBase } from '../core/sonolus'
import { BackgroundItemModel, toBackgroundItem } from './background-item'
import { EffectItemModel, toEffectItem } from './effect-item'
import { EngineItemModel, toEngineItem } from './engine-item'
import { Model, ToItem, getItem } from './item'
import { Localize } from './localization'
import { ParticleItemModel, toParticleItem } from './particle-item'
import { SkinItemModel, toSkinItem } from './skin-item'
import { toTags } from './tag'

export type UseItemModel<T> =
    | {
          useDefault: true
      }
    | {
          useDefault: false
          item: string | T
      }

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
export interface LevelItemModel
    extends Model<
        DatabaseLevelItem,
        {
            engine: string | EngineItemModel
            useSkin: UseItemModel<SkinItemModel>
            useBackground: UseItemModel<BackgroundItemModel>
            useEffect: UseItemModel<EffectItemModel>
            useParticle: UseItemModel<ParticleItemModel>
        }
    > {}

export const toLevelItem: ToItem<LevelItemModel, LevelItem> = (sonolus, localize, item) => ({
    name: item.name,
    source: sonolus.address,
    version: item.version,
    rating: item.rating,
    engine: toEngineItem(
        sonolus,
        localize,
        getItem(sonolus.db.engines, item.engine, `Level/${item.name}`, '.engine'),
    ),
    useSkin: toUseItem(
        sonolus,
        localize,
        toSkinItem,
        item.useSkin,
        sonolus.db.skins,
        `Level/${item.name}`,
        '.useSkin.item',
    ),
    useBackground: toUseItem(
        sonolus,
        localize,
        toBackgroundItem,
        item.useBackground,
        sonolus.db.backgrounds,
        `Level/${item.name}`,
        '.useBackground.item',
    ),
    useEffect: toUseItem(
        sonolus,
        localize,
        toEffectItem,
        item.useEffect,
        sonolus.db.effects,
        `Level/${item.name}`,
        '.useEffect.item',
    ),
    useParticle: toUseItem(
        sonolus,
        localize,
        toParticleItem,
        item.useParticle,
        sonolus.db.particles,
        `Level/${item.name}`,
        '.useParticle.item',
    ),
    title: localize(item.title),
    artists: localize(item.artists),
    author: localize(item.author),
    tags: toTags(localize, item.tags),
    cover: item.cover,
    bgm: item.bgm,
    preview: item.preview,
    data: item.data,
})

export const toUseItem = <T extends { name: string }, U>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<T, U>,
    useItem: UseItemModel<T>,
    items: T[],
    parent: string,
    path: string,
): UseItem<U> =>
    useItem.useDefault
        ? {
              useDefault: true,
          }
        : {
              useDefault: false,
              item: toItem(sonolus, localize, getItem(items, useItem.item, parent, path)),
          }
