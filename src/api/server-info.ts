import { Database, LocalizationText, ServerInfo } from 'sonolus-core'
import {
    toBackgroundItem,
    toEffectItem,
    toEngineItem,
    toLevelItem,
    toParticleItem,
    toSkinItem,
} from '.'

export function toServerInfo(
    serverInfo: Database,
    db: Database,
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
