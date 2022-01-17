import { Database, LocalizationText, ServerInfo } from 'sonolus-core'
import {
    toBackgroundItem,
    toEffectItem,
    toEngineItem,
    toLevelItem,
    toParticleItem,
    toSkinItem,
} from '.'
import { search } from '..'

export function toServerInfo(
    serverInfo: Database,
    db: Database,
    localize: (text: LocalizationText) => string
): ServerInfo {
    return {
        levels: {
            items: serverInfo.levels.map((info) =>
                toLevelItem(db, localize, info)
            ),
            search,
        },
        skins: {
            items: serverInfo.skins.map((info) =>
                toSkinItem(db, localize, info)
            ),
            search,
        },
        backgrounds: {
            items: serverInfo.backgrounds.map((info) =>
                toBackgroundItem(db, localize, info)
            ),
            search,
        },
        effects: {
            items: serverInfo.effects.map((info) =>
                toEffectItem(db, localize, info)
            ),
            search,
        },
        particles: {
            items: serverInfo.particles.map((info) =>
                toParticleItem(db, localize, info)
            ),
            search,
        },
        engines: {
            items: serverInfo.engines.map((info) =>
                toEngineItem(db, localize, info)
            ),
            search,
        },
    }
}
