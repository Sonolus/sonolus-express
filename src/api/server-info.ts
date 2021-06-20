import { DB } from '../jtd/db'
import { LocalizationText } from '../jtd/localization-text'
import { BackgroundItem, toBackgroundItem } from './background-item'
import { EffectItem, toEffectItem } from './effect-item'
import { EngineItem, toEngineItem } from './engine-item'
import { LevelItem, toLevelItem } from './level-item'
import { ParticleItem, toParticleItem } from './particle-item'
import { SkinItem, toSkinItem } from './skin-item'

export type ServerInfo = {
    levels: LevelItem[]
    skins: SkinItem[]
    backgrounds: BackgroundItem[]
    effects: EffectItem[]
    particles: ParticleItem[]
    engines: EngineItem[]
}

export function toServerInfo(
    serverInfo: DB,
    db: DB,
    localize: (text: LocalizationText) => string
): ServerInfo {
    return {
        levels: serverInfo.levels.map((info) =>
            toLevelItem(db, localize, info)
        ),
        skins: serverInfo.skins.map((info) => toSkinItem(db, localize, info)),
        backgrounds: serverInfo.backgrounds.map((info) =>
            toBackgroundItem(db, localize, info)
        ),
        effects: serverInfo.effects.map((info) =>
            toEffectItem(db, localize, info)
        ),
        particles: serverInfo.particles.map((info) =>
            toParticleItem(db, localize, info)
        ),
        engines: serverInfo.engines.map((info) =>
            toEngineItem(db, localize, info)
        ),
    }
}
