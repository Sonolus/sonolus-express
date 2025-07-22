import { DatabaseLevelItem, LevelItem, UseItem } from '@sonolus/core'
import { SonolusBase } from '../../sonolus/base.js'
import { Localize } from '../../utils/localization.js'
import { toTags } from '../tag.js'
import { BackgroundItemModel, toBackgroundItem } from './background.js'
import { EffectItemModel, toEffectItem } from './effect.js'
import { EngineItemModel, toEngineItem } from './engine.js'
import { ItemModel, Model, ToItem, getItem } from './item.js'
import { ParticleItemModel, toParticleItem } from './particle.js'
import { SkinItemModel, toSkinItem } from './skin.js'

export type UseItemModel<T> =
    | {
          useDefault: true
      }
    | {
          useDefault: false
          item: string | T
      }

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
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
        getItem(sonolus.engine.items, item.engine, `Level/${item.name}`, '.engine'),
    ),
    useSkin: toUseItem(
        sonolus,
        localize,
        toSkinItem,
        item.useSkin,
        sonolus.skin.items,
        `Level/${item.name}`,
        '.useSkin.item',
    ),
    useBackground: toUseItem(
        sonolus,
        localize,
        toBackgroundItem,
        item.useBackground,
        sonolus.background.items,
        `Level/${item.name}`,
        '.useBackground.item',
    ),
    useEffect: toUseItem(
        sonolus,
        localize,
        toEffectItem,
        item.useEffect,
        sonolus.effect.items,
        `Level/${item.name}`,
        '.useEffect.item',
    ),
    useParticle: toUseItem(
        sonolus,
        localize,
        toParticleItem,
        item.useParticle,
        sonolus.particle.items,
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

export const toUseItem = <TItemModel extends ItemModel, TItem>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<TItemModel, TItem>,
    useItem: UseItemModel<TItemModel>,
    items: TItemModel[],
    parent: string,
    path: string,
): UseItem<TItem> =>
    useItem.useDefault
        ? {
              useDefault: true,
          }
        : {
              useDefault: false,
              item: toItem(sonolus, localize, getItem(items, useItem.item, parent, path)),
          }
