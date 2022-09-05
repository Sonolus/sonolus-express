import {
    Database,
    LevelInfo,
    LevelItem,
    LocalizationText,
    UseInfo,
    UseItem,
} from 'sonolus-core'
import {
    toBackgroundItem,
    toEffectItem,
    toEngineItem,
    toParticleItem,
    toSkinItem,
} from '.'
import { getByName } from '..'
import { ToItem } from './item'

export function toLevelItem(
    db: Database,
    localize: (text: LocalizationText) => string,
    info: LevelInfo
): LevelItem {
    return {
        name: info.name,
        version: info.version,
        rating: info.rating,
        engine: toEngineItem(
            db,
            localize,
            getByName(db.engines, info.engine, `Level/${info.name}`)
        ),
        useSkin: toUse(info.useSkin, db.skins, toSkinItem),
        useBackground: toUse(
            info.useBackground,
            db.backgrounds,
            toBackgroundItem
        ),
        useEffect: toUse(info.useEffect, db.effects, toEffectItem),
        useParticle: toUse(info.useParticle, db.particles, toParticleItem),
        title: localize(info.title),
        artists: localize(info.artists),
        author: localize(info.author),
        cover: info.cover,
        bgm: info.bgm,
        preview: info.preview,
        data: info.data,
    }

    function toUse<T extends { name: string }, U>(
        useInfo: UseInfo,
        infos: T[],
        toItem: ToItem<T, U>
    ): UseItem<U> {
        return useInfo.useDefault
            ? {
                  useDefault: true,
              }
            : {
                  useDefault: false,
                  item: toItem(
                      db,
                      localize,
                      getByName(infos, useInfo.item, `Level/${info.name}`)
                  ),
              }
    }
}
