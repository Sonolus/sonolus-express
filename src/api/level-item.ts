import { DB, getByName } from '../jtd/db'
import { LevelInfo, Use as LevelInfoUse } from '../jtd/level-info'
import { LocalizationText } from '../jtd/localization-text'
import { SRL } from '../jtd/srl'
import { BackgroundItem, toBackgroundItem } from './background-item'
import { EffectItem, toEffectItem } from './effect-item'
import { EngineItem, toEngineItem } from './engine-item'
import { ParticleItem, toParticleItem } from './particle-item'
import { SkinItem, toSkinItem } from './skin-item'

type Use<T> = {
    useDefault: boolean
    item?: T
}

export type LevelItem = {
    name: string
    version: number
    rating: number
    engine: EngineItem
    useSkin: Use<SkinItem>
    useBackground: Use<BackgroundItem>
    useEffect: Use<EffectItem>
    useParticle: Use<ParticleItem>
    title: string
    artists: string
    author: string
    cover: SRL<'LevelCover'>
    bgm: SRL<'LevelBgm'>
    data: SRL<'LevelData'>
}

export function toLevelItem(
    db: DB,
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
        useSkin: toUse(info.useSkin, db.skins, db, toSkinItem),
        useBackground: toUse(
            info.useBackground,
            db.backgrounds,
            db,
            toBackgroundItem
        ),
        useEffect: toUse(info.useEffect, db.effects, db, toEffectItem),
        useParticle: toUse(info.useParticle, db.particles, db, toParticleItem),
        title: localize(info.title),
        artists: localize(info.artists),
        author: localize(info.author),
        cover: info.cover,
        bgm: info.bgm,
        data: info.data,
    }

    function toUse<T extends { name: string }, U>(
        use: LevelInfoUse,
        infos: T[],
        db: DB,
        toItem: (
            db: DB,
            localize: (text: LocalizationText) => string,
            info: T
        ) => U
    ): Use<U> {
        return {
            useDefault: use.useDefault,
            item: use.item
                ? toItem(
                      db,
                      localize,
                      getByName(infos, use.item, `Level/${info.name}`)
                  )
                : undefined,
        }
    }
}
