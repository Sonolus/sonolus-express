import { DatabaseLevelItem, DatabaseUseItem, LevelItem, UseItem } from '@sonolus/core'
import { SonolusBase } from '../core/sonolus'
import { toBackgroundItem } from './background-item'
import { toEffectItem } from './effect-item'
import { toEngineItem } from './engine-item'
import { ToItem, getByName } from './item'
import { Localize } from './localization'
import { toParticleItem } from './particle-item'
import { toSkinItem } from './skin-item'
import { toTags } from './tag'

export const toLevelItem: ToItem<DatabaseLevelItem, LevelItem> = (sonolus, localize, item) => ({
    name: item.name,
    source: sonolus.address,
    version: item.version,
    rating: item.rating,
    engine: toEngineItem(
        sonolus,
        localize,
        getByName(sonolus.db.engines, item.engine, `Level/${item.name}`, '.engine'),
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
    useItem: DatabaseUseItem,
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
              item: toItem(sonolus, localize, getByName(items, useItem.item, parent, path)),
          }
